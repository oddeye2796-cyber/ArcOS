import React, { useCallback, useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { HeaderLinkBar } from './components/HeaderLinkBar';
import { CatalogView } from './components/CatalogView';
import { AppDetailModal } from './components/AppDetailModal';
import { QuoteView } from './components/QuoteView';
import { WorkspaceView } from './components/WorkspaceView';
import { ArchitectureView } from './components/ArchitectureView';
import { PatchNotesView } from './components/PatchNotesView';
import { DeployModal } from './components/DeployModal';
import { PoCApplyModal } from './components/PoCApplyModal';
import { Language } from './i18n/translations';
import { CurrencyCode, defaultCurrencyForLanguage, isCurrencyCode } from './lib/currency';
import { applyDocumentLanguage, detectInitialLanguage, parseLanguage } from './lib/language';
import { STORAGE_KEYS, readStored, usePersistentState, writeStored } from './lib/storage';
import { parseCart } from './lib/scenarios';
import { POC_EXTENSION_DAYS, canExtend } from './lib/poc';
import {
  APPS_DATA,
  INITIAL_INSTALLED_MODULES,
  INITIAL_DECOMMISSIONED_MODULES,
  INITIAL_POC_TRIALS
} from './data/appsData';
import {
  AppItem,
  CartItem,
  SubModuleItem,
  WorkspaceInstalledModule,
  DecommissionedModule,
  PoCTrial,
  RecommendationPreset,
  NavRoute
} from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('catalog');
  const [selectedLocation, setSelectedLocation] = useState<string>('[경남/사천] 항공·정밀가공 사업장');
  const [tenantName] = useState<string>('[경남/사천] 항공·정밀기계 제조연합');
  // Stored preference, else the browser's language, else Korean.
  const [lang, setLang] = useState<Language>(detectInitialLanguage);

  const handleLangChange = useCallback((next: Language) => {
    setLang(next);
    // Persisted eagerly so the choice survives even if the tab closes at once.
    writeStored(STORAGE_KEYS.lang, next);
  }, []);

  // Screen readers and CJK font fallback both key off <html lang>.
  useEffect(() => {
    applyDocumentLanguage(lang);
  }, [lang]);

  // First visit picks a currency from the detected language; after that the
  // explicit choice is what matters, so it is never overwritten by a language switch.
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const stored = readStored(STORAGE_KEYS.currency, (raw) => (isCurrencyCode(raw) ? raw : null));
    return stored ?? defaultCurrencyForLanguage(detectInitialLanguage());
  });

  const handleCurrencyChange = useCallback((next: CurrencyCode) => {
    setCurrency(next);
    writeStored(STORAGE_KEYS.currency, next);
  }, []);

  // Initial cart with Pharma MES + EBRS as specified in prototype.
  // Persisted: losing a half-built quote to an accidental refresh was the single
  // most costly interaction in the simulator.
  const [cart, setCart] = usePersistentState<CartItem[]>(STORAGE_KEYS.cart, [
    {
      id: 'mes-pharma',
      appId: 'smartfactory',
      name: '제약 특화 MES',
      category: 'Smart Factory',
      price: 80,
      per: 'line',
      unitLabel: '라인당 80만원/월'
    },
    {
      id: 'ebrs',
      appId: 'smartfactory',
      name: 'EBRS (전자 제조기록)',
      category: 'Smart Factory',
      price: 120,
      per: 'flat',
      unitLabel: '기본 120만원/월 (배치량 연동)'
    }
  ], parseCart);

  const [installedModules, setInstalledModules] = useState<WorkspaceInstalledModule[]>(
    INITIAL_INSTALLED_MODULES
  );
  const [decommissionedModules] = useState<DecommissionedModule[]>(
    INITIAL_DECOMMISSIONED_MODULES
  );
  const [pocTrials, setPocTrials] = useState<PoCTrial[]>(INITIAL_POC_TRIALS);

  // Modal states
  const [selectedAppForDetail, setSelectedAppForDetail] = useState<AppItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [deployModalState, setDeployModalState] = useState<{
    isOpen: boolean;
    app: AppItem | null;
    location: string;
  }>({
    isOpen: false,
    app: null,
    location: '[경남/사천] 항공·정밀가공 사업장'
  });

  const [pocApplyModalState, setPocApplyModalState] = useState<{
    isOpen: boolean;
    app: AppItem | null;
  }>({
    isOpen: false,
    app: null
  });


  // Toggle single item in cart
  const handleToggleCartItem = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.some((c) => c.id === item.id);
      if (exists) {
        return prev.filter((c) => c.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // MES radio selection (mutual exclusivity among MES core: pharma, food, general)
  const handleSelectRadioMES = (item: SubModuleItem, suiteApp: AppItem) => {
    setCart((prev) => {
      const mesIds = ['mes-pharma', 'mes-food', 'mes-general'];
      const filtered = prev.filter((c) => !mesIds.includes(c.id));
      return [
        ...filtered,
        {
          id: item.id,
          appId: suiteApp.id,
          name: item.name,
          category: suiteApp.category,
          price: item.price,
          per: item.per,
          unitLabel: item.unitLabel
        }
      ];
    });
  };

  // Quick toggle from card
  const handleQuickToggleCart = (app: AppItem) => {
    if (app.suite) {
      setSelectedAppForDetail(app);
      setIsDetailModalOpen(true);
      return;
    }
    handleToggleCartItem({
      id: app.id,
      appId: app.id,
      name: app.name,
      category: app.category,
      price: app.price || 0,
      per: app.per || 'flat',
      unitLabel: app.unit
    });
  };

  const handleOpenDetailModal = (app: AppItem) => {
    setSelectedAppForDetail(app);
    setIsDetailModalOpen(true);
  };

  const handleDeployRequest = (app: AppItem, location: string) => {
    setIsDetailModalOpen(false);
    setDeployModalState({
      isOpen: true,
      app,
      location
    });
  };

  const handleDeployComplete = (moduleName: string, location: string, category: string) => {
    const newId = `inst-${Date.now()}`;
    const newModule: WorkspaceInstalledModule = {
      id: newId,
      name: moduleName,
      category: category,
      location: location,
      runtimeVersion: 'v4.2',
      status: 'active',
      lastPing: '방금 전 (정상 수신)',
      dataLakeBinding: 'B²LAB 온톨로지 바인딩 완료',
      localResource: 'CPU 14% | RAM 2.4GB / 16GB'
    };

    setInstalledModules((prev) => [newModule, ...prev]);
    setCurrentRoute('workspace');
  };

  const handleUpgradeModule = (id: string) => {
    setInstalledModules((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, runtimeVersion: 'v4.2', status: 'active' } : m
      )
    );
  };

  // PoC Trial Handlers
  const handleOpenPoCModal = (app: AppItem) => {
    setPocApplyModalState({
      isOpen: true,
      app
    });
  };

  const handleApplyPoCSubmit = (trialData: PoCTrial) => {
    setPocTrials((prev) => [trialData, ...prev.filter((t) => t.id !== trialData.id)]);
    setCurrentRoute('workspace');
  };

  const handleConvertPoCToSub = (trial: PoCTrial) => {
    const matchingApp = APPS_DATA.find((a) => a.id === trial.appId);
    if (matchingApp) {
      handleToggleCartItem({
        id: matchingApp.id,
        appId: matchingApp.id,
        name: matchingApp.name,
        category: matchingApp.category,
        price: matchingApp.price || 0,
        per: matchingApp.per || 'flat',
        unitLabel: matchingApp.unit
      });
    }
    setCurrentRoute('quote');
  };

  const handleRemovePoCTrial = (trialId: string) => {
    setPocTrials((prev) => prev.filter((t) => t.id !== trialId));
  };

  /** Grants the one allowed extension, pushing back the expiry date with it. */
  const handleExtendPoCTrial = (trialId: string) => {
    setPocTrials((prev) =>
      prev.map((trial) => {
        if (trial.id !== trialId || !canExtend(trial)) return trial;
        const expires = new Date(trial.expiresAt);
        expires.setDate(expires.getDate() + POC_EXTENSION_DAYS);
        return {
          ...trial,
          daysRemaining: trial.daysRemaining + POC_EXTENSION_DAYS,
          expiresAt: expires.toISOString().split('T')[0],
          extensionsUsed: (trial.extensionsUsed ?? 0) + 1,
          status: 'active'
        };
      })
    );
  };

  const handleRequestPoCEngineer = (trialId: string) => {
    setPocTrials((prev) =>
      prev.map((trial) => (trial.id === trialId ? { ...trial, engineerRequested: true } : trial))
    );
  };

  // Presets
  const handleApplyPreset = (preset: RecommendationPreset) => {
    setCart(preset.recommendedModules);
  };

  // Stable identities: useModalDismiss keys its keydown listener on onClose,
  // so an inline arrow would re-subscribe on every App render.
  const closeDetailModal = useCallback(() => setIsDetailModalOpen(false), []);
  const closeDeployModal = useCallback(
    () => setDeployModalState((prev) => ({ ...prev, isOpen: false })),
    []
  );
  const closePoCApplyModal = useCallback(
    () => setPocApplyModalState((prev) => ({ ...prev, isOpen: false })),
    []
  );

  const handleBatchDeploy = () => {
    if (cart.length === 0) return;
    const firstCartApp = APPS_DATA.find((a) => a.id === cart[0].appId) || APPS_DATA[0];
    setDeployModalState({
      isOpen: true,
      app: firstCartApp,
      location: selectedLocation
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentRoute={currentRoute}
        onRouteChange={setCurrentRoute}
        cartCount={cart.length}
        installedCount={installedModules.length}
        tenantName={tenantName}
        lang={lang}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Link Bar */}
        <HeaderLinkBar
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          lang={lang}
          onLangChange={handleLangChange}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />

        {/* View Switcher */}
        <main className="flex-1 overflow-y-auto">
          {currentRoute === 'catalog' && (
            <CatalogView
              apps={APPS_DATA}
              cart={cart}
              pocTrials={pocTrials}
              onSelectApp={handleOpenDetailModal}
              onQuickToggleCart={handleQuickToggleCart}
              onApplyPoC={handleOpenPoCModal}
              onGoToQuote={() => setCurrentRoute('quote')}
              onApplyPreset={handleApplyPreset}
              lang={lang}
              currency={currency}
            />
          )}

          {currentRoute === 'quote' && (
            <QuoteView
              cart={cart}
              onRemoveItem={(id) => setCart((prev) => prev.filter((c) => c.id !== id))}
              onClearCart={() => setCart([])}
              onApplyPreset={handleApplyPreset}
              onGoToCatalog={() => setCurrentRoute('catalog')}
              onBatchDeploy={handleBatchDeploy}
              tenantName={tenantName}
              selectedLocation={selectedLocation}
              lang={lang}
              currency={currency}
            />
          )}

          {currentRoute === 'workspace' && (
            <WorkspaceView
              installedModules={installedModules}
              decommissionedModules={decommissionedModules}
              pocTrials={pocTrials}
              onUpgradeModule={handleUpgradeModule}
              onGoToCatalog={() => setCurrentRoute('catalog')}
              onConvertPoCToSub={handleConvertPoCToSub}
              onRemovePoCTrial={handleRemovePoCTrial}
              onExtendPoCTrial={handleExtendPoCTrial}
              onRequestPoCEngineer={handleRequestPoCEngineer}
              selectedLocation={selectedLocation}
              lang={lang}
              currency={currency}
            />
          )}

          {currentRoute === 'patches' && (
            <PatchNotesView
              lang={lang}
              selectedLocation={selectedLocation}
            />
          )}

          {currentRoute === 'architecture' && <ArchitectureView lang={lang} />}
        </main>
      </div>

      {/* Modals */}
      <AppDetailModal
        app={selectedAppForDetail}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        cart={cart}
        onToggleCartItem={handleToggleCartItem}
        onSelectRadioMES={handleSelectRadioMES}
        onDeployRequest={handleDeployRequest}
        onApplyPoC={handleOpenPoCModal}
        lang={lang}
        currency={currency}
      />

      <DeployModal
        isOpen={deployModalState.isOpen}
        onClose={closeDeployModal}
        targetApp={deployModalState.app}
        targetLocation={deployModalState.location}
        onDeployComplete={handleDeployComplete}
        lang={lang}
      />

      <PoCApplyModal
        isOpen={pocApplyModalState.isOpen}
        onClose={closePoCApplyModal}
        app={pocApplyModalState.app}
        selectedLocation={selectedLocation}
        onApplySuccess={handleApplyPoCSubmit}
        lang={lang}
      />
    </div>
  );
}
