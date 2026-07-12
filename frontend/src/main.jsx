import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './lib/store.js'

if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {}; 
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
        <App />
    </Provider>
  </StrictMode>,
)
