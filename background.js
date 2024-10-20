
function openNextUrl() {


  // Selecionar todas as linhas que contêm URLs no atributo 'title'
  const rows = document.querySelectorAll('tr[title*="https"]');

  // Verificar se há linhas encontradas
  if (rows.length > 0) {
    let index = 0; // Índice inicial

    // Função para abrir a URL da próxima linha
    const openNextUrl = function () {
      if (index >= rows.length) {
        console.log("Todas as URLs foram processadas.");
        clearInterval(intervalId); // Para o intervalo quando todas as linhas forem processadas
        return;
      }

      const row = rows[index];
      const url = row.getAttribute('title'); // Obter o URL do atributo 'title'

      // Verificar se a URL é válida
      if (url) {
        console.log(`Abrindo URL ${index + 1}: ${url}`);
        window.open(url, '_blank'); // Abrir o link em uma nova aba

        // Aplicar o estilo de fundo vermelho para indicar que a linha foi processada
        row.style.setProperty('color', 'red', 'important');

      } else {
        console.log(`URL não encontrada na linha ${index + 1}`);
      }

      index++; // Incrementar o índice para a próxima linha
    };

    // Iniciar o intervalo que abrirá uma URL a cada 4 segundos (5000ms)
    const intervalId = setInterval(openNextUrl, 4000);
  } else {
    console.log("Nenhuma linha com URL encontrada.");
  }

}

// Função que será injetada para verificar o botão "Salvar"
function checkSaveButtonPresence() {
  const button = document.querySelector('button.scalable.save[title="Salvar"]');
  console.log(button);
  if (button) {
    console.log('Botão "Salvar" encontrado!');

    setTimeout(() => {
      button.click();
    }, 5000);


    //não funciona
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: 'closeTab' });
    }, 5000);



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