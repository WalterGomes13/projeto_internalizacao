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


const DIAS_SEMANA1 = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const DIAS_SEMANA2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DIAS_SEMANA3 = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const idiomaEn = 'en-US';
const idiomaPt = 'pt-BR';
const idiomaSp = 'es-ES';
export let idioma = idiomaPt;

let DIAS_SEMANA = DIAS_SEMANA1;
let turmas = [];
let currentDate = new Date();

function init() {
    initTheme();
    initTabs();
    initCalendar(turmas, currentDate, DIAS_SEMANA,idioma);
    initTurmas(turmas);
    initForms(turmas, DIAS_SEMANA);
    initRelatorios(turmas);

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
    initCalendar(turmas, currentDate, DIAS_SEMANA,idioma);
    initTurmas(turmas);
}

document.addEventListener('DOMContentLoaded', init);

export { turmas, currentDate, DIAS_SEMANA,DIAS_SEMANA2,DIAS_SEMANA3,idiomaEn,idiomaPt, atualizarVisualizacoes };

botaoIng.addEventListener("click", () => {
    DIAS_SEMANA = DIAS_SEMANA2;
    idioma = idiomaEn;
    atualizarVisualizacoes();
    fetch('en.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = getNestedValue(translations, key) || key;
                element.textContent = translation;
            });
            console.log(translations);
        })
        .catch(err => console.error('Error loading translation:', err));
});

function getNestedValue(obj, key) {
    return key.split('.').reduce((o, i) => o[i], obj);
}

botaoEsp.addEventListener("click", () => {
    DIAS_SEMANA = DIAS_SEMANA3;
    idioma = idiomaSp;
    atualizarVisualizacoes();
    fetch('sp.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = getNestedValue(translations, key) || key;
                element.textContent = translation;
            });
            console.log(translations);
        })
        .catch(err => console.error('Error loading translation:', err));
});

botaoPor.addEventListener("click", () => {
    DIAS_SEMANA = DIAS_SEMANA1;
    idioma = idiomaPt;
    atualizarVisualizacoes();
    fetch('pt.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = getNestedValue(translations, key) || key;
                element.textContent = translation;
            });
            console.log(translations);
        })
        .catch(err => console.error('Error loading translation:', err));
    
});