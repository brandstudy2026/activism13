// script.js

// 1. URL della survey (sostituisci con il tuo)
const surveyUrl = 'https://www.youtube.com/watch?v=IM3Ktr7rV-Q';

// 2. (Opzionale) endpoint per raccogliere i dati di click e permanenza
const TRACKING_ENDPOINT = 'YOUR_TRACKING_ENDPOINT';

// 3. Timestamp di inizio e contatore click
const startTime = Date.now();
let clickCount = 0;

// 4. Funzione per gestire il clic sul bottone
function onReturnClick() {
  clickCount++;
  // invia subito l’evento click (puoi commentare o rimuovere se non ti serve)
  fetch(TRACKING_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'return_click',
      timestamp: Date.now(),
      clickCount
    })
  }).catch(console.error);

  // poi reindirizza alla survey
  window.location.href = surveyUrl;
}

// 5. Funzione per inviare il tempo di permanenza quando l’utente lascia la pagina
function onBeforeUnload() {
  const timeSpentSec = Math.round((Date.now() - startTime) / 1000);
  navigator.sendBeacon(TRACKING_ENDPOINT, JSON.stringify({
    event: 'page_exit',
    timestamp: Date.now(),
    timeSpentSec,
    clickCount
  }));
}

// 6. Collego gli handler quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('return-btn');
  if (btn) {
    btn.addEventListener('click', onReturnClick);
  }
  window.addEventListener('beforeunload', onBeforeUnload);
});

