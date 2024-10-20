// Função que será injetada para verificar o botão "Salvar"

function checkSaveButtonPresence() {
  const button = document.querySelector('button.scalable.save[title="Salvar"]');
  console.log(button);
  if (button) {
    console.log('Botão "Salvar" encontrado!');

    setTimeout(() => {
      button.click();
    }, 2800);



    setTimeout(() => {
      chrome.runtime.sendMessage({ action: 'closeTab' });
    }, 7000);




  } else {
    console.log('Botão "Salvar" não encontrado.');
  }
}
// BASE DO CÓDIGO QUE MONITORA AS ABAS E CARREGA O SCRIPT DE CADA ABA ESPECIFICADA


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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'closeTab') {
    chrome.tabs.remove(sender.tab.id);  // Fecha a aba que enviou a mensagem
  }
});