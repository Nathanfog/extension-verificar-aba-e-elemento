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

  document.getElementById('tool1-btn-iniciar').addEventListener('click', () => iniciarMonitoramento());

  // Exibe a primeira ferramenta ao abrir
  showTool('tool1');


  function iniciarMonitoramento() {
    console.log("Monitorando URLs...");
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

      // Iniciar o intervalo que abrirá uma URL a cada 5 segundos (5000ms)
      const intervalId = setInterval(openNextUrl, 5000);
    } else {
      console.log("Nenhuma linha com URL encontrada.");
    }

  }
});






