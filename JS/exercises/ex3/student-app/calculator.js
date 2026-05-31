// calculator.js — export calcGPA, classify, getTopStudent
export function calcGPA(scores) {
  if (!scores || scores.length === 0) return 0;
  const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
  return Math.round(avg * 10) / 10; // 1 decimal
}

export function classify(gpa) {
  if (gpa >= 8) return 'Giỏi';
  if (gpa >= 6.5) return 'Khá';
  if (gpa >= 5) return 'Trung bình';
  return 'Yếu';
}

export function getTopStudent(students) {
  if (!students || students.length === 0) return null;
  let top = students[0];
  let topGPA = calcGPA(top.scores);
  for (const s of students) {
    const gpa = calcGPA(s.scores);
    if (gpa > topGPA) {
      top = s;
      topGPA = gpa;
    }
  }
  return { student: top, gpa: topGPA };
}
