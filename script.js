let current = 0;
let score = 0;
let respondida = false;

const container = document.getElementById('quiz-container');
const resultado = document.getElementById('resultado');

function mostrarPregunta() {
  respondida = false; // reiniciar el estado
  const q = preguntas[current];
  let html = '<div class="question">' + (current + 1) + '. ' + q.pregunta + '</div><div class="options">';
  q.opciones.forEach((opt, i) => {
    html += `<label data-index="${i}"><input type="radio" name="respuesta" style="display:none;"> ${opt}</label>`;
  });
  html += '</div>';
  container.innerHTML = html;

  document.querySelectorAll('.options label').forEach(label => {
    label.onclick = () => {
      if (respondida) return; // ya se respondió, no hacer nada más

      const idx = parseInt(label.dataset.index);
      const correcta = q.correcta;

      // Resetear estilos
      document.querySelectorAll('.options label').forEach(l => {
        l.classList.remove('correct', 'wrong');
      });

      // Mostrar feedback visual
      if (idx === correcta) {
        label.classList.add('correct');
        score++;
      } else {
        label.classList.add('wrong');
        document.querySelectorAll('.options label')[correcta].classList.add('correct');
      }

      respondida = true; // marcar como respondida
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
