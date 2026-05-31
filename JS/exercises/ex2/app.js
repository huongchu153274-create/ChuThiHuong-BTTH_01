// exercise 2 - demo using Alert component
import showAlert, { ALERT_TYPES } from './components/Alert.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.textContent = 'Show Success Alert';
  btn.onclick = () => showAlert('Thành công!', ALERT_TYPES.SUCCESS);
  document.body.appendChild(btn);
});
