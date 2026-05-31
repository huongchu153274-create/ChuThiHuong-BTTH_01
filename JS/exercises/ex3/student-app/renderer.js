// renderer.js — renderTable(students, container)
import { calcGPA, classify } from './calculator.js';

export function renderTable(students, container) {
  const table = document.createElement('table');
  table.border = '1';
  table.style.borderCollapse = 'collapse';
  table.style.width = '100%';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>STT</th><th>Họ tên</th><th>Điểm TB</th><th>Xếp loại</th></tr>';
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  students.forEach((s, i) => {
    const gpa = calcGPA(s.scores);
    const cls = classify(gpa);
    const tr = document.createElement('tr');
    if (cls === 'Giỏi') tr.style.background = '#d4edda';
    if (cls === 'Yếu') tr.style.background = '#f8d7da';
    tr.innerHTML = `<td style="padding:8px;text-align:center">${i+1}</td>
      <td style="padding:8px">${s.name}</td>
      <td style="padding:8px;text-align:center">${gpa.toFixed(1)}</td>
      <td style="padding:8px;text-align:center">${cls}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
}
