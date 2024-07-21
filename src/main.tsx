import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.css';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/styles.scss';
import AppRouter from './components/AppRouter';
import { ConfigProvider } from 'antd';
import viVN from "antd/locale/vi_VN";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={viVN}>
        <AppRouter />
        <ToastContainer autoClose={3000} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
