// esse código deve ser executado na página de produtos

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
            
            window.open(url, '_blank'); // Abrir o link em uma nova aba

            

            function calcularHoraTermino(index, rowsLength) {
                const tempoPorURL = 7; // em segundos
                const tempoTotal = rows.length * tempoPorURL; // tempo total em segundos
                const tempoDecorrido = (index + 1) * tempoPorURL; // tempo decorrido em segundos
                const tempoRestante = tempoTotal - tempoDecorrido; // tempo restante em segundos

                // Obtendo a hora atual
                const agora = new Date();
                agora.setSeconds(agora.getSeconds() + tempoRestante);

                // Formatando a hora estimada de término
                const horaEstimada = agora.toLocaleTimeString('pt-BR');
                return horaEstimada;
            }
            const rowsLength = rows.length; // total de URLs
            console.log('Tempo estimado decorrido' + (index + 1) * 7 + ' segundos');
            console.log('Tempo estimado decorrido Minutos' + ((index + 1) * tempoPorURL) / 60 + ' minutos');
            console.log('Tempo estimado total para essa página' + (rows.length * tempoPorURL) / 60 + ' minutos');
            console.log(`Hora estimada de término: ${calcularHoraTermino(index, rowsLength)}`);
            console.log(`Abrindo URL ${index + 1} de ${rows.length}: ${url}`);

           
            
            row.style.setProperty('color', 'blue', 'important');
            // Aplicar o estilo de fundo vermelho para indicar que a linha foi processada
            

        } else {
            console.log(`URL não encontrada na linha ${index + 1}`);
        }

        index++; // Incrementar o índice para a próxima linha
    };

    // Iniciar o intervalo que abrirá uma URL a cada 4 segundos (4000ms)
    const intervalId = setInterval(openNextUrl, 4000);
} else {
    console.log("Nenhuma linha com URL encontrada.");
}