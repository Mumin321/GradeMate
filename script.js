function getGradePoint(mark, subject) {
  const total = subject === 'ICT' ? 100 : 200;
  const percentage = (mark / total) * 100;

  if (percentage >= 80) return { point: 5.00, grade: 'A+' };
  else if (percentage >= 70) return { point: 4.00, grade: 'A' };
  else if (percentage >= 60) return { point: 3.50, grade: 'A-' };
  else if (percentage >= 50) return { point: 3.00, grade: 'B' };
  else if (percentage >= 40) return { point: 2.00, grade: 'C' };
  else if (percentage >= 33) return { point: 1.00, grade: 'D' };
  else return { point: 0.00, grade: 'F' };
}

function calculateGPA() {
  const subjects = ['Bangla', 'English', 'ICT', 'Physics', 'Chemistry', 'Math', 'Biology'];
  const optional = document.getElementById("optionalSubject").value;
  let totalMarks = 0, totalPoints = 0, fail = false;
  let optionalPoint = 0;

  let resultHTML = `<div id="pdfArea"><h3 class="section-title">Your Result</h3><table><tr><th>Subject</th><th>Marks</th><th>GPA</th><th>Grade</th></tr>`;

  for (let subject of subjects) {
    const mark = parseInt(document.getElementById(subject).value) || 0;
    const { point, grade } = getGradePoint(mark, subject);
    totalMarks += mark;

    if (point === 0) fail = true;

    if (subject === optional) {
      optionalPoint = point > 2 ? point - 2 : 0;
      resultHTML += `<tr><td>${subject} (Optional)</td><td>${mark}</td><td>${point.toFixed(2)}</td><td>${grade}</td></tr>`;
    } else {
      totalPoints += point;
      resultHTML += `<tr><td>${subject}</td><td>${mark}</td><td>${point.toFixed(2)}</td><td>${grade}</td></tr>`;
    }
  }

  let gpa = fail ? 0 : ((totalPoints + optionalPoint) / 6);
  if (gpa > 5) gpa = 5;

  const finalGrade = fail ? 'F' : 
    gpa === 5 ? 'A+' : 
    gpa >= 4 ? 'A' : 
    gpa >= 3.5 ? 'A-' :
    gpa >= 3 ? 'B' :
    gpa >= 2 ? 'C' :
    gpa >= 1 ? 'D' : 'F';

  resultHTML += `<tr><td><b>Total</b></td><td><b>${totalMarks}</b></td><td><b>${gpa.toFixed(2)}</b></td><td><b>${finalGrade}</b></td></tr></table></div>`;

  document.getElementById("result").innerHTML = resultHTML;
}
