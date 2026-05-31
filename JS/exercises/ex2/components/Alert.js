// components/Alert.js
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export default function showAlert(message, type = ALERT_TYPES.INFO) {
  const div = document.createElement('div');
  div.className = `alert alert-${type}`;
  div.textContent = message;
  Object.assign(div.style, {
    position: 'fixed',
    right: '20px',
    top: '20px',
    padding: '10px 16px',
    borderRadius: '4px',
    color: '#fff',
    zIndex: 10000
  });
  const bg = {
    success: '#2ecc71',
    error: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db'
  }[type] || '#3498db';
  div.style.background = bg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
