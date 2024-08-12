// forms.js
import { $, validarFormulario, validarHorarios, salvarTurmas } from './utils.js';
import { atualizarVisualizacoes } from './main.js';
import { atualizarListaTurmas } from './turmas.js';

export function initForms(turmas, DIAS_SEMANA) {
    setupFormCadastro(turmas, DIAS_SEMANA);
    setupFormEditar(turmas);
}

function setupFormCadastro(turmas, DIAS_SEMANA) {
    $('#form-cadastro').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validarFormulario(e.target)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const formData = new FormData(e.target);
        const novaTurma = Object.fromEntries(formData.entries());
        
        if (!validarHorarios(novaTurma.horarioInicio, novaTurma.horarioFim)) {
            alert('O horário de início deve ser anterior ao horário de término.');
            return;
        }

        turmas.push(novaTurma);
        salvarTurmas(turmas);
        atualizarVisualizacoes();
        e.target.reset();
    });
}

function setupFormEditar(turmas) {
    $('#form-editar').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validarFormulario(e.target)) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const formData = new FormData(e.target);
        const turmaEditada = Object.fromEntries(formData.entries());
        const index = $('#editar-id').value;
        
        if (!validarHorarios(turmaEditada.horarioInicio, turmaEditada.horarioFim)) {
            alert('O horário de início deve ser anterior ao horário de término.');
            return;
        }

        turmas[index] = turmaEditada;
        salvarTurmas(turmas);
        atualizarVisualizacoes();
        $('#modal-editar').classList.add('hidden');
    });
}

export function abrirModalEditar(turma, index) {
    $('#editar-id').value = index;
    $('#editar-nome').value = turma.nome;
    $('#editar-tipo').value = turma.tipo;
    $('#editar-dataInicio').value = turma.dataInicio;
    $('#editar-diaSemana').value = turma.diaSemana;
    $('#editar-horarioInicio').value = turma.horarioInicio;
    $('#editar-horarioFim').value = turma.horarioFim;
    
    $('#modal-editar').classList.remove('hidden');
}

$('.close').addEventListener('click', () => {
    $('#modal-editar').classList.add('hidden');
});