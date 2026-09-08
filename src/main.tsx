import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {loadLanguage} from './i18n/loadLanguage';
import {detectInitialLanguage} from './lib/language';

/**
 * The UI reads its strings synchronously during render, so the language has to
 * be loaded before the first one. That is one small chunk fetched on its own —
 * the alternative, rendering in a language the visitor did not ask for and
 * swapping it a moment later, is worse than a beat of nothing.
 */
loadLanguage(detectInitialLanguage())
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((error) => {
    // Nothing can render without strings, and a blank page tells the visitor
    // nothing. Written in all three languages because which one they read is
    // exactly what failed to load.
    console.error('ArcOS: failed to load language resources', error);
    const root = document.getElementById('root');
    if (!root) return;
    root.innerHTML = `
      <div style="font-family: system-ui, sans-serif; padding: 48px; text-align: center; color: #334155;">
        <p style="margin: 0 0 8px;">페이지를 불러오지 못했습니다. 새로고침해 주세요.</p>
        <p style="margin: 0 0 8px;">Failed to load the page. Please reload.</p>
        <p style="margin: 0;">ページを読み込めませんでした。再読み込みしてください。</p>
      </div>`;
  });
