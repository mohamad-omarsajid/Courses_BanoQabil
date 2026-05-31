import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { ThemeProvider } from './lib/theme';
import { LangProvider } from './lib/i18n';

// Mark JS-on so the CSS can safely hide pre-reveal elements.
document.documentElement.classList.add('js', 'is-loading');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ThemeProvider>
  </StrictMode>
);
