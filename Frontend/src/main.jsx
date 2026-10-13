import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip"
import App from './App.jsx'
import { Bounce, Flip, ToastContainer } from 'react-toastify';
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from './context/LanguageContext.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Provider store={store}>
    <ThemeProvider>
      <LanguageProvider>
     <TooltipProvider>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
    <App />

    </TooltipProvider>
    </LanguageProvider>
    </ThemeProvider>
  </Provider>
    </BrowserRouter>

  </StrictMode>
)
