import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '../index.css';
import {loadLanguage} from '../i18n/loadLanguage';
import {ExpoApp} from './ExpoApp';
import {detectExpoLanguage} from './expoLanguage';

/** Same contract as the main entry: strings are read synchronously, so load first. */
loadLanguage(detectExpoLanguage())
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ExpoApp />
      </StrictMode>,
    );
  })
  .catch((error) => {
    console.error('ArcOS expo: failed to load language resources', error);
    const root = document.getElementById('root');
    if (!root) return;
    root.innerHTML = `
      <div style="font-family: system-ui, sans-serif; padding: 48px; text-align: center; color: #334155;">
        <p style="margin: 0 0 8px;">ページを読み込めませんでした。再読み込みしてください。</p>
        <p style="margin: 0 0 8px;">Failed to load the page. Please reload.</p>
        <p style="margin: 0;">페이지를 불러오지 못했습니다. 새로고침해 주세요.</p>
      </div>`;
  });
