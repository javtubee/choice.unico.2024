let current = 0;
let score = 0;

const container = document.getElementById('quiz-container');
const resultado = document.getElementById('resultado');

function mostrarPregunta() {
  const q = preguntas[current];
  let html = '<div class="question">' + (current+1) + '. ' + q.pregunta + '</div><div class="options">';
  q.opciones.forEach((opt, i) => {
    html += `<label data-index="${i}"><input type="radio" name="respuesta" style="display:none;"> ${opt}</label>`;
  });
  html += '</div>';
  container.innerHTML = html;

  document.querySelectorAll('.options label').forEach(label => {
    label.onclick = () => {
      const idx = parseInt(label.dataset.index);
      const correcta = q.correcta;

      // Limpiar todos los estilos anteriores
      document.querySelectorAll('.options label').forEach(l => {
        l.classList.remove('correct', 'wrong', 'selected');
      });

      // Marcar visualmente
      if (idx === correcta) {
        label.classList.add('correct');
      } else {
        label.classList.add('wrong');
        document.querySelectorAll('.options label')[correcta].classList.add('correct');
      }

      label.classList.add('selected');

      // Sumar puntaje solo si es la primera vez
      if (!label.classList.contains('respondido')) {
        if (idx === correcta) score++;
        label.classList.add('respondido');
      }
    };
  });
}

document.getElementById('prev').onclick = () => {
  if (current > 0) {
    current--;
    mostrarPregunta();
  }
};

document.getElementById('next').onclick = () => {
  if (current < preguntas.length - 1) {
    current++;
    mostrarPregunta();
  } else {
    container.innerHTML = '';
    resultado.innerText = `Resultado final: ${score} / ${preguntas.length}`;
    document.querySelector('.navigation').style.display = 'none';
  }
};

mostrarPregunta();
