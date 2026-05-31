import { students } from './data.js';
import { calcGPA, getTopStudent } from './calculator.js';
import { renderTable } from './renderer.js';

const container = document.getElementById('app');
const topEl = document.getElementById('top-student');

// compute GPA for each student and attach
const studentsWithGPA = students.map(s => ({ ...s, gpa: calcGPA(s.scores) }));

renderTable(studentsWithGPA, container);

const top = getTopStudent(students);
if (top) {
  topEl.textContent = `Top student: ${top.student.name} — GPA: ${top.gpa.toFixed(1)}`;
}
