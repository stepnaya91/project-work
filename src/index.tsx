import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ThemeProvider } from './shared/providers/ThemeProvider';
import { LanguageProvider } from './shared/providers/LanguageProvider';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navigation } from './shared/navigation/Navigation';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <Provider store={store}>
          <Navigation>
            <App />
          </Navigation>
        </Provider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
