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

  function iniciarMonitoramento(){
    //ainda não implementado
  console.log("iniciando monitoramento");

  }
});