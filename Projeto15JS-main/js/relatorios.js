// relatorios.js
import { $, validarFormulario } from './utils.js';

export function initRelatorios(turmas) {
    setupFormRelatorio(turmas);
}

function setupFormRelatorio(turmas) {
    $('#form-relatorio').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validarFormulario(e.target)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const formData = new FormData(e.target);
        const relatorio = Object.fromEntries(formData.entries());
        
        const dataInicio = new Date(relatorio.dataInicio);
        const dataFim = new Date(relatorio.dataFim);
        
        if (dataInicio > dataFim) {
            alert('A data de início deve ser anterior ou igual à data de fim.');
            return;
        }

        const diasNoIntervalo = (dataFim - dataInicio) / (1000 * 60 * 60 * 24) + 1;
        
        const resultado = turmas.reduce((acc, turma) => {
            const turmaInicio = new Date(turma.dataInicio);
            if (turmaInicio >= dataInicio && turmaInicio <= dataFim) {
                acc.numeroTurmas++;
                
                const [horaInicio, minutoInicio] = turma.horarioInicio.split(':').map(Number);
                const [horaFim, minutoFim] = turma.horarioFim.split(':').map(Number);
                const duracaoHoras = (horaFim - horaInicio) + (minutoFim - minutoInicio) / 60;
                
                const semanasNoIntervalo = Math.floor(diasNoIntervalo / 7);
                const horasTurma = duracaoHoras * semanasNoIntervalo;
                acc.horasTotais += horasTurma;

                let valorHora = 0;
                switch (turma.tipo) {
                    case 'Curso':
                        valorHora = parseFloat(relatorio.valorHoraCurso);
                        break;
                    case 'Super Módulo':
                        valorHora = parseFloat(relatorio.valorHoraSuperModulo);
                        break;
                    case 'Super Reforço':
                        valorHora = parseFloat(relatorio.valorHoraSuperReforco);
                        break;
                }
                acc.valorTotal += horasTurma * valorHora;
            }
            return acc;
        }, { numeroTurmas: 0, horasTotais: 0, valorTotal: 0 });

        exibirResultadoRelatorio(resultado);
    });
}

function exibirResultadoRelatorio(resultado) {
    $('#numero-turmas').textContent = resultado.numeroTurmas;
    $('#total-horas').textContent = resultado.horasTotais.toFixed(2);
    $('#valor-total').textContent = resultado.valorTotal.toFixed(2);
    $('#resultado-relatorio').classList.remove('hidden');
}