// turmas.js
import { $, $$, salvarTurmas } from './utils.js';
import { atualizarVisualizacoes } from './main.js';

export function initTurmas(turmas) {
    atualizarListaTurmas(turmas);
    setupDownloadUpload(turmas);
}

function atualizarListaTurmas(turmas) {
    const listaTurmas = $('#lista-turmas');
    listaTurmas.innerHTML = '';
    turmas.forEach((turma, index) => {
        const turmaElement = document.createElement('div');
        turmaElement.classList.add('card');
        turmaElement.innerHTML = `
            <h3>${turma.nome}</h3>
            <p><i data-lucide="users"></i> ${turma.tipo}</p>
            <p><i data-lucide="calendar"></i> Início: ${turma.dataInicio}</p>
            <p><i data-lucide="calendar"></i> ${turma.diaSemana}</p>
            <p><i data-lucide="clock"></i> ${turma.horarioInicio} - ${turma.horarioFim}</p>
            <button class="btn-editar" data-index="${index}">Editar</button>
            <button class="btn-excluir" data-index="${index}">Excluir</button>
        `;
        listaTurmas.appendChild(turmaElement);
    });
    lucide.createIcons();
    setupEditButtons(turmas);
    setupDeleteButtons(turmas);
}

function setupEditButtons(turmas) {
    $$('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;
            abrirModalEditar(turmas[index], index);
        });
    });
}

function setupDeleteButtons(turmas) {
    $$('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;
            if (confirm('Tem certeza que deseja excluir esta turma?')) {
                turmas.splice(index, 1);
                salvarTurmas(turmas);
                atualizarVisualizacoes();
            }
        });
    });
}

function setupDownloadUpload(turmas) {
    $('#btn-download').addEventListener('click', () => {
        const dataStr = JSON.stringify(turmas, null, 2);
        const blob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'turmas.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });

    $('#btn-upload').addEventListener('click', () => {
        $('#file-input').click();
    });

    $('#file-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const turmasCarregadas = JSON.parse(event.target.result);
                    if (Array.isArray(turmasCarregadas)) {
                        turmas.length = 0; // Limpa o array atual
                        turmas.push(...turmasCarregadas); // Adiciona as novas turmas
                        salvarTurmas(turmas);
                        atualizarVisualizacoes();
                        alert('Turmas carregadas com sucesso!');
                    } else {
                        throw new Error('O arquivo não contém um array válido de turmas.');
                    }
                } catch (error) {
                    console.error('Erro ao carregar o arquivo:', error);
                    alert('Erro ao carregar o arquivo. Verifique se é um JSON válido contendo um array de turmas.');
                }
            };
            reader.readAsText(file);
        }
    });
}

export { atualizarListaTurmas };