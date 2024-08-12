// tabs.js
import { $, $$ } from './utils.js';

export function initTabs() {
    $$('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            $$('.tab-button').forEach(btn => btn.classList.remove('active'));
            $$('.tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            $(`#${button.dataset.tab}`).classList.add('active');
        });
    });

    $('#btn-semanal').addEventListener('click', () => {
        $('#calendario-semanal').classList.remove('hidden');
        $('#calendario-mensal').classList.add('hidden');
        $('#btn-semanal').classList.add('active');
        $('#btn-mensal').classList.remove('active');
    });
    
    $('#btn-mensal').addEventListener('click', () => {
        $('#calendario-semanal').classList.add('hidden');
        $('#calendario-mensal').classList.remove('hidden');
        $('#btn-semanal').classList.remove('active');
        $('#btn-mensal').classList.add('active');
    });
}