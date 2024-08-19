// calendar.js
import { idioma } from './main.js';
import { $, $$ } from './utils.js';

export function initCalendar(turmas, currentDate, DIAS_SEMANA,idioma) {
    atualizarCalendarioSemanal(turmas, DIAS_SEMANA);
    atualizarCalendarioMensal(turmas, currentDate, DIAS_SEMANA,idioma);

    $('#prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        atualizarCalendarioMensal(turmas, currentDate, DIAS_SEMANA,idioma);
    });
    
    $('#next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        atualizarCalendarioMensal(turmas, currentDate, DIAS_SEMANA,idioma);
    });
}

function atualizarCalendarioSemanal(turmas, DIAS_SEMANA) {
    const calendario = $('#calendario-semanal');
    calendario.innerHTML = '';
    DIAS_SEMANA.forEach(dia => {
        const diaElement = document.createElement('div');
        diaElement.classList.add('calendar-day');
        diaElement.innerHTML = `<h3>${dia}</h3>`;
        const turmasDoDia = turmas.filter(turma => turma.diaSemana === dia);
        turmasDoDia.forEach(turma => {
            const turmaElement = document.createElement('div');
            turmaElement.classList.add('calendar-event', turma.tipo.replace(' ', ''));
            turmaElement.innerHTML = `
                <p><strong>${turma.nome}</strong></p>
                <p>${turma.tipo}</p>
                <p>${turma.horarioInicio} - ${turma.horarioFim}</p>
            `;
            diaElement.appendChild(turmaElement);
        });
        calendario.appendChild(diaElement);
    });
}

function atualizarCalendarioMensal(turmas, currentDate, DIAS_SEMANA,idioma) {
    const calendarDays = $('.calendar-days');
    const calendarHeader = $('.calendar-header');

    calendarHeader.innerHTML = `
        <button id="prev-month">&lt;</button>
        <h3 id="current-month">${currentDate.toLocaleString(idioma, { month: 'long', year: 'numeric' })}</h3>
        <button id="next-month">&gt;</button>
    `;

    
    calendarDays.innerHTML = '';
    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    for (let i = 0; i < 7; i++) {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-day-header');
        dayHeader.textContent = DIAS_SEMANA[i];
        calendarDays.appendChild(dayHeader);
    }
    
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day-cell');
        calendarDays.appendChild(emptyCell);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day-cell');
        dayCell.innerHTML = `<span class="calendar-day-number">${i}</span>`;
        
        const currentDayOfWeek = DIAS_SEMANA[new Date(currentDate.getFullYear(), currentDate.getMonth(), i).getDay()];
        const turmasDoDia = turmas.filter(turma => turma.diaSemana === currentDayOfWeek);
        
        turmasDoDia.forEach(turma => {
            const turmaElement = document.createElement('div');
            turmaElement.classList.add('calendar-event', turma.tipo.replace(' ', ''));
            turmaElement.innerHTML = `
                <p><strong>${turma.nome}</strong></p>
                <p>${turma.horarioInicio} - ${turma.horarioFim}</p>
            `;
            dayCell.appendChild(turmaElement);
        });
        
        dayCell.addEventListener('click', () => {
            const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            abrirFormularioNovaTurma(clickedDate, DIAS_SEMANA);
        });
        
        calendarDays.appendChild(dayCell);
    }

}


export function abrirFormularioNovaTurma(data, DIAS_SEMANA) {
    const diaSemana = DIAS_SEMANA[data.getDay()];
    const dataFormatada = data.toISOString().split('T')[0];
    
    $('#nome').value = '';
    $('#tipo').value = '';
    $('#dataInicio').value = dataFormatada;
    $('#diaSemana').value = diaSemana;
    $('#horarioInicio').value = '';
    $('#horarioFim').value = '';
    
    $('.tab-button[data-tab="cadastro"]').click();
}