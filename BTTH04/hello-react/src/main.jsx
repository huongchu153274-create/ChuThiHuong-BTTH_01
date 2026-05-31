import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 1. Tìm mảnh đất trống trong HTML
const rootElement = document.getElementById('root');

// 2. Tạo một cái "rễ" (root) của React trên mảnh đất đó
const root = createRoot(rootElement);

// 3. Render (vẽ) Component App vào rễ đó
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)