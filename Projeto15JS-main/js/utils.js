// utils.js
export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function validarFormulario(form) {
  const inputs = form.querySelectorAll('input, select');
  let isValid = true;
  inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('invalid');
      } else {
          input.classList.remove('invalid');
      }
  });
  return isValid;
}

export function validarHorarios(horaInicio, horaFim) {
  const inicio = new Date(`2000-01-01T${horaInicio}`);
  const fim = new Date(`2000-01-01T${horaFim}`);
  return inicio < fim;
}

export function salvarTurmas(turmas) {
  localStorage.setItem('turmas', JSON.stringify(turmas));
}