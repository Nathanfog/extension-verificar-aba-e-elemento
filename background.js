
// Função que será injetada para verificar o botão "Salvar"
function checkSaveButtonPresence() {
  const button = document.querySelector('button.scalable.save[title="Salvar"]');
  console.log(button);
  if (button) {
    console.log('Botão "Salvar" encontrado!');
    button.click();
    setTimeout(() => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        // Fecha a aba atual após 3 segundos
        chrome.tabs.remove(tabs[0].id);
      });
    }, 3000);

  } else {
    console.log('Botão "Salvar" não encontrado.');
  }
}
// BASE DO CÓDIGO QUE MONITORA AS ABAS E CARREGA O SCRIPT DE CADA ABA ESPECIFICADA //

// Monitora quando uma aba é atualizada
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {  // Quando a aba terminar de carregar
    chrome.scripting.executeScript({
      target: { tabId: tabId },   // Injetar o script na aba correta
      func: checkSaveButtonPresence  // Injetar a função diretamente
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("Erro ao injetar script: ", chrome.runtime.lastError);
      }
    });
  }
});

// Monitora quando uma nova aba é criada
chrome.tabs.onCreated.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: checkSaveButtonPresence  // Injetar a função diretamente
  }, (results) => {
    if (chrome.runtime.lastError) {
      console.log("Erro ao injetar script: ");
    }
  });
});