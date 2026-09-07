import React from 'react';
import { ShieldCheck, Cloud, Server, ArrowRightLeft, Radio, Building2, Globe, Coins, RefreshCw } from 'lucide-react';
import { FACILITIES_LIST } from '../data/presetsData';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { getLocalizedFacilityName } from '../i18n/localizedData';
import { CURRENCY_CODES, CurrencyCode } from '../lib/currency';
import { useExchangeRates } from '../lib/useExchangeRates';

interface HeaderLinkBarProps {
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export const HeaderLinkBar: React.FC<HeaderLinkBarProps> = ({
  selectedLocation,
  onLocationChange,
  lang,
  onLangChange,
  currency,
  onCurrencyChange
}) => {
  const t = TRANSLATIONS[lang];
  const currentFacility = FACILITIES_LIST.find((f) => f.fullName === selectedLocation) || FACILITIES_LIST[0];
  const { snapshot: rateSnapshot, status: rateStatus, refresh: refreshRates } = useExchangeRates();

  // Only meaningful once a conversion is actually happening.
  const showRateStatus = currency !== 'KRW';
  const rateStatusLabel =
    rateStatus === 'loading'
      ? t.rateStatusLoading
      : rateStatus === 'stale' || rateStatus === 'error'
      ? t.rateStatusStale
      : rateSnapshot.source === 'bundled'
      ? t.rateStatusBundled
      : t.rateStatusLive;
  const rateIsLive = rateStatus === 'live' && rateSnapshot.source !== 'bundled';

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-2.5 text-xs text-slate-700">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Hybrid Plane Connection Visualization */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Control Plane */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            <Cloud className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-900">{t.controlPlane}</span>
            <span className="text-slate-500">{t.controlPlaneDesc}</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              {t.normalStatus}
            </span>
          </div>

          {/* Bridge Tunnel */}
          <div className="flex items-center gap-1 text-slate-400">
            <div className="w-4 h-px bg-slate-300"></div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px]">
              <ArrowRightLeft className="w-3 h-3 text-blue-600 animate-pulse" />
              <span>ArcTunnel mTLS</span>
              <span className="text-[10px] text-blue-500 font-sans">{currentFacility.latencyMs}ms</span>
            </div>
            <div className="w-4 h-px bg-slate-300"></div>
          </div>

          {/* Data Plane */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            <Server className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-900">{t.dataPlane}</span>
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-400" />
              <select
                aria-label={t.ariaSelectFacility}
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="bg-transparent font-medium text-slate-800 border-none outline-none cursor-pointer hover:text-blue-600 text-xs py-0"
              >
                {FACILITIES_LIST.map((fac) => (
                  <option key={fac.id} value={fac.fullName}>
                    {getLocalizedFacilityName(fac, lang)}
                  </option>
                ))}
              </select>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <Radio className="w-2.5 h-2.5 text-emerald-500 animate-ping" />
              {t.dataPlaneDesc} ({currentFacility.runtimeVersion})
            </span>
          </div>
        </div>

        {/* Right: Security Guarantee & Multi-Language Selector */}
        <div className="flex items-center gap-3 ml-auto flex-wrap">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-500 text-[11.5px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium text-slate-700">
              {t.securityNoticeTitle}
            </span>
            <span className="text-slate-600 truncate max-w-xs xl:max-w-none">
              {t.securityNoticeDesc}
            </span>
          </div>

          {/* Display Currency */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <Coins className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
            <select
              aria-label={t.ariaSelectCurrency}
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent font-medium text-slate-700 border-none outline-none cursor-pointer hover:text-blue-600 text-xs py-1 pr-1"
            >
              {CURRENCY_CODES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>

            {showRateStatus && (
              <button
                onClick={refreshRates}
                disabled={rateStatus === 'loading'}
                title={`${rateStatusLabel} · ${rateSnapshot.asOf}`}
                aria-label={t.rateRefreshLabel}
                className="flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded text-[10px] font-medium transition-colors hover:bg-slate-200/70 disabled:cursor-default"
              >
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    rateStatus === 'loading'
                      ? 'bg-slate-400 animate-pulse'
                      : rateIsLive
                      ? 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`}
                />
                <RefreshCw
                  className={`w-2.5 h-2.5 text-slate-500 ${
                    rateStatus === 'loading' ? 'animate-spin' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
            <button
              onClick={() => onLangChange('ko')}
              aria-pressed={lang === 'ko'}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                lang === 'ko'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              한국어
            </button>
            <button
              onClick={() => onLangChange('en')}
              aria-pressed={lang === 'en'}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLangChange('ja')}
              aria-pressed={lang === 'ja'}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                lang === 'ja'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              日本語
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

