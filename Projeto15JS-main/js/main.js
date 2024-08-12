// main.js
import { $, $$ } from './utils.js';
import { initTheme } from './theme.js';
import { initTabs } from './tabs.js';
import { initCalendar } from './calendar.js';
import { initTurmas } from './turmas.js';
import { initForms } from './forms.js';
import { initRelatorios } from './relatorios.js';
const botaoIng = document.getElementById('mudarIdiomaEn');
const botaoEsp = document.getElementById('mudarIdiomaEs');
const botaoPor = document.getElementById('mudarIdiomaPt');

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const dias_ing = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dias_esp = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let turmas = [];
let currentDate = new Date();

function init() {
    initTheme();
    initTabs();
    initCalendar(turmas, currentDate, DIAS_SEMANA);
    initTurmas(turmas);
    initForms(turmas, DIAS_SEMANA);
    initRelatorios(turmas);

    // Carregar turmas salvas
    carregarTurmas();
}

function carregarTurmas() {
    const turmasSalvas = localStorage.getItem('turmas');
    if (turmasSalvas) {
        turmas = JSON.parse(turmasSalvas);
        atualizarVisualizacoes();
    }
}

function atualizarVisualizacoes() {
    initCalendar(turmas, currentDate, DIAS_SEMANA);
    initTurmas(turmas);
}

document.addEventListener('DOMContentLoaded', init);

export { turmas, currentDate, DIAS_SEMANA, atualizarVisualizacoes };

// Supondo que `botao` é o seu botão que inicia o processo de tradução
botaoIng.addEventListener("click", () => {
    fetch('en.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(translations => {
            // Atualiza o conteúdo do HTML com as traduções
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                // Obtém a tradução correspondente, com fallback para a chave original
                const translation = getNestedValue(translations, key) || key;
                element.textContent = translation;
            });
            console.log(translations);
        })
        .catch(err => console.error('Error loading translation:', err));
});

// Função auxiliar para obter valores de chaves aninhadas
function getNestedValue(obj, key) {
    return key.split('.').reduce((o, i) => o[i], obj);
}

botaoEsp.addEventListener("click", () => {
    fetch('sp.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(translations => {
            // Atualiza o conteúdo do HTML com as traduções
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                // Obtém a tradução correspondente, com fallback para a chave original
                const translation = getNestedValue(translations, key) || key;
                element.textContent = translation;
            });
            console.log(translations);
        })
        .catch(err => console.error('Error loading translation:', err));
});

botaoPor.addEventListener("click", () => {
    fetch('pt.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(translations => {
            // Atualiza o conteúdo do HTML com as traduções
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                // Obtém a tradução correspondente, com fallback para a chave original
                const translation = getNestedValue(translations, key) || key;
                element.textContent = translation;
            });
            console.log(translations);
        })
        .catch(err => console.error('Error loading translation:', err));
});