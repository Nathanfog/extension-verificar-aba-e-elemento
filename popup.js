document.addEventListener('DOMContentLoaded', function () {
  const toolSections = document.querySelectorAll('.tool-section');

  // Esconde todas as seções de ferramentas inicialmente
  function hideAllTools() {
    toolSections.forEach((section) => (section.style.display = 'none'));
  }

  // Exibe uma ferramenta com base no ID fornecido
  function showTool(toolId) {
    hideAllTools();
    document.getElementById(toolId).style.display = 'block';
  }

  // Eventos para os botões do menu
  document.getElementById('tool1-btn').addEventListener('click', () => showTool('tool1'));
  document.getElementById('tool2-btn').addEventListener('click', () => showTool('tool2'));
  document.getElementById('tool3-btn').addEventListener('click', () => showTool('tool3'));
  document.getElementById('tool4-btn').addEventListener('click', () => showTool('tool4'));
  document.getElementById('tags-btn').addEventListener('click', () => startIntervalTeste());

  // Exibe a primeira ferramenta ao abrir
  showTool('tool1');

  // Função para exibir as URLs, títulos e horário carregados nas abas (Ferramenta 1)
  const tabList = document.getElementById('tab-list');

  // Função para formatar a hora
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  // Função para adicionar o título, URL e hora de carregamento à lista sem sobrescrever ou duplicar
  function addTabInfoToList(tabId, title, url, time) {
    const li = document.createElement('li');
    li.setAttribute('data-tab-id', tabId); // Define o ID único da aba como um atributo

    // Elemento que exibirá o título da página
    const titleElement = document.createElement('span');
    titleElement.textContent = title ? title : 'Sem título';  // Exibe 'Sem título' se não houver título
    titleElement.style.fontWeight = 'bold';  // Título destacado
    titleElement.style.display = 'block';    // Título em uma linha separada

    // Elemento para o link da página
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.textContent = url;
    linkElement.target = '_blank';  // Abre o link em nova aba
    linkElement.style.display = 'block';  // Link em linha separada

    // Elemento para a hora de carregamento
    const timeElement = document.createElement('span');
    timeElement.textContent = `Carregado às: ${time}`;  // Formato da hora
    timeElement.style.fontSize = 'small';  // Tamanho da fonte menor
    timeElement.style.color = 'gray';  // Cor do texto da hora
    timeElement.style.display = 'block';  // Hora em linha separada

    // Adiciona o título, o link e a hora ao item da lista
    li.appendChild(titleElement);
    li.appendChild(linkElement);
    li.appendChild(timeElement);

    // Adiciona o item à lista
    tabList.appendChild(li);
  }

  // Função para monitorar o carregamento de URLs em uma aba e adicionar título, URL e hora à lista
  function monitorTabLoading(tabId, title, url) {
    const currentTime = formatTime(new Date()); // Obtém a hora atual formatada
    addTabInfoToList(tabId, title, url, currentTime);
  }

  // Inicializa ao abrir o popup, obtendo todas as abas abertas
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      monitorTabLoading(tab.id, tab.title, tab.url);
    });
  });

  // Monitora quando a URL de uma aba for atualizada/carregada
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
      monitorTabLoading(tabId, tab.title, changeInfo.url);  // Adiciona o título, a nova URL e a hora carregada à lista
    }
  });

  // Monitora quando uma nova aba é criada
  chrome.tabs.onCreated.addListener(function (tab) {
    monitorTabLoading(tab.id, tab.title, tab.url);  // Adiciona o título, URL e hora da nova aba criada
  });

  // Monitora quando uma aba é fechada e remove da lista
  chrome.tabs.onRemoved.addListener(function (tabId) {
    const tabElements = document.querySelectorAll(`li[data-tab-id="${tabId}"]`);
    tabElements.forEach((element) => element.remove());  // Remove todos os elementos relacionados a essa aba
  });
});


function startInterval() {
  const elements = document.querySelectorAll('.icon-tag-assistant');
  console.log(elements);
  console.log("1 - elemento captuarado");

  let index = 0;

  const intervalId = setInterval(() => {
      console.log("2 - Entrou set Interval");
      if (index < elements.length) {
          console.log("3 - Entrou IF");
          elements[index].style.background = 'red';
          elements[index].click();
          index++;
      } else {
          console.error("4 - ELSE");
          clearInterval(intervalId); // Para o intervalo após todos os elementos
      }
  }, 15000); // 15 segundos
}






