import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider, createTheme } from '@mui/material';

import App from './App';
import store, { persistor } from './redux/store';

import './firebase';
import './sass/index.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2f3640',
        },
        secondary: {
            main: '#e056fd',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
