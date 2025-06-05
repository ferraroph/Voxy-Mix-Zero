const steps = [
  '[FG] Etapa 1 - Login (Pronta).html',
  '[FG] Etapa 2 - DNA Musical.html',
  '[FG] Etapa 3 - Segmentação (Alpha).html',
  '[FG] Etapa 4 - Mecanismo Antigo Comum (Alpha).html',
  '[FG] Etapa 5 - Presets Comuns (Alpha).html',
  '[FG] Etapa 6 - Presets Dinâmicos (Beta 1).html',
  '[FG] Etapa 6.1 - Transição.html',
  '[FG] Etapa 7 - Oferta (Beta 1).html'
];

const basePath = '../Banco de Dados - IA/Htmls/';
const frame = document.getElementById('stageFrame');
let currentIndex = 0;

function getIndexFromPath(path) {
  const name = decodeURIComponent(path.split('/').pop());
  return steps.indexOf(name);
}

function loadStep(index) {
  currentIndex = index;
  frame.src = basePath + steps[index];
}

function nextStep() {
  if (currentIndex + 1 < steps.length) {
    loadStep(currentIndex + 1);
  }
}

function attachHandler(buttonId) {
  const doc = frame.contentDocument;
  const btn = doc && doc.getElementById(buttonId);
  if (btn) {
    btn.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        nextStep();
      },
      true
    );
  }
}

function setupStep() {
  const idx = getIndexFromPath(frame.contentWindow.location.pathname);
  if (idx !== -1) {
    currentIndex = idx;
  }
  switch (currentIndex) {
    case 0:
      const win = frame.contentWindow;
      if (win.showSuccessScreen && !win.showSuccessScreen.__patched) {
        const original = win.showSuccessScreen;
        win.showSuccessScreen = function () {
          original();
          setTimeout(nextStep, 2000);
        };
        win.showSuccessScreen.__patched = true;
      }
      break;
    case 1:
      attachHandler('continueBtn');
      break;
    case 2:
      attachHandler('advanceBtn');
      break;
    case 3:
    case 4:
    case 5:
      attachHandler('continueBtn');
      break;
    case 6:
      // página de transição
      setTimeout(nextStep, 4000);
      break;
  }
}

frame.addEventListener('load', setupStep);
loadStep(currentIndex);
