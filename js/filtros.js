// Código corrigido para o sistema de filtros
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de filtros carregado'); // Para debug
    
    // Elementos do filtro
    const checkboxMaisVendidos = document.getElementById('ofertas');
    const checkboxNovidades = document.getElementById('novidades');
    
    // Verificar se os elementos existem
    if (!checkboxMaisVendidos || !checkboxNovidades) {
        console.error('Checkboxes não encontrados!');
        return;
    }
    
    // Encontrar as seções corretamente
    const todasSecoes = document.querySelectorAll('.card-wrap');
    console.log('Seções encontradas:', todasSecoes.length);
    
    let secaoMaisVendidos = null;
    let secaoNovidades = null;
    
    // Identificar seções pelos títulos
    todasSecoes.forEach(secao => {
        const titulo = secao.querySelector('h2');
        if (titulo) {
            const textoTitulo = titulo.textContent.trim().toLowerCase();
            console.log('Título encontrado:', textoTitulo);
            
            if (textoTitulo.includes('mais vendidos')) {
                secaoMaisVendidos = secao;
                console.log('Seção Mais Vendidos identificada');
            } else if (textoTitulo.includes('novidades')) {
                secaoNovidades = secao;
                console.log('Seção Novidades identificada');
            }
        }
    });
    
    // Verificar se as seções foram encontradas
    if (!secaoMaisVendidos || !secaoNovidades) {
        console.error('Seções não encontradas corretamente');
        console.log('Mais Vendidos:', secaoMaisVendidos);
        console.log('Novidades:', secaoNovidades);
        return;
    }
    
    // Função para atualizar a visibilidade das seções
    function atualizarFiltros() {
        const maisVendidosAtivo = checkboxMaisVendidos.checked;
        const novidadesAtivo = checkboxNovidades.checked;
        
        console.log('Filtros:', {
            maisVendidos: maisVendidosAtivo,
            novidades: novidadesAtivo
        });
        
        // Lógica de exibição
        if (!maisVendidosAtivo && !novidadesAtivo) {
            // Nenhum filtro ativo - mostra tudo
            secaoMaisVendidos.style.display = 'block';
            secaoNovidades.style.display = 'block';
        } else if (maisVendidosAtivo && !novidadesAtivo) {
            // Apenas Mais Vendidos
            secaoMaisVendidos.style.display = 'block';
            secaoNovidades.style.display = 'none';
        } else if (!maisVendidosAtivo && novidadesAtivo) {
            // Apenas Novidades
            secaoMaisVendidos.style.display = 'none';
            secaoNovidades.style.display = 'block';
        } else {
            // Ambos ativos - mostra tudo
            secaoMaisVendidos.style.display = 'block';
            secaoNovidades.style.display = 'block';
        }
    }
    
    // Event listeners
    checkboxMaisVendidos.addEventListener('change', function() {
        console.log('Checkbox Mais Vendidos alterado:', this.checked);
        atualizarFiltros();
    });
    
    checkboxNovidades.addEventListener('change', function() {
        console.log('Checkbox Novidades alterado:', this.checked);
        atualizarFiltros();
    });
    
    // Estado inicial - mostra todas as seções
    atualizarFiltros();
    
    console.log('Sistema de filtros inicializado com sucesso');
});

// Alternativa: Sistema de filtro por produtos individuais
function sistemaFiltroAvancado() {
    document.addEventListener('DOMContentLoaded', function() {
        const checkboxMaisVendidos = document.getElementById('ofertas');
        const checkboxNovidades = document.getElementById('novidades');
        
        // Marcar produtos com atributos de categoria
        function marcarProdutos() {
            const todasSecoes = document.querySelectorAll('.card-wrap');
            
            todasSecoes.forEach(secao => {
                const titulo = secao.querySelector('h2');
                if (titulo) {
                    const textoTitulo = titulo.textContent.trim().toLowerCase();
                    const produtos = secao.querySelectorAll('.card');
                    
                    if (textoTitulo.includes('mais vendidos')) {
                        produtos.forEach(produto => {
                            produto.setAttribute('data-categoria', 'mais-vendidos');
                        });
                    } else if (textoTitulo.includes('novidades')) {
                        produtos.forEach(produto => {
                            produto.setAttribute('data-categoria', 'novidades');
                        });
                    }
                }
            });
        }
        
        function filtrarProdutos() {
            const maisVendidosAtivo = checkboxMaisVendidos.checked;
            const novidadesAtivo = checkboxNovidades.checked;
            const todosProdutos = document.querySelectorAll('.card[data-categoria]');
            
            todosProdutos.forEach(produto => {
                const categoria = produto.getAttribute('data-categoria');
                let mostrar = false;
                
                // Se nenhum filtro ativo, mostra tudo
                if (!maisVendidosAtivo && !novidadesAtivo) {
                    mostrar = true;
                } else {
                    // Verifica se deve mostrar baseado nos filtros ativos
                    if (maisVendidosAtivo && categoria === 'mais-vendidos') {
                        mostrar = true;
                    }
                    if (novidadesAtivo && categoria === 'novidades') {
                        mostrar = true;
                    }
                }
                
                produto.style.display = mostrar ? 'block' : 'none';
            });
            
            // Gerenciar títulos das seções
            const todasSecoes = document.querySelectorAll('.card-wrap');
            todasSecoes.forEach(secao => {
                const produtos = secao.querySelectorAll('.card[data-categoria]');
                const produtosVisiveis = Array.from(produtos).some(p => p.style.display !== 'none');
                
                // Mostra/oculta a seção inteira se não há produtos visíveis
                const titulo = secao.querySelector('h2');
                if (titulo) {
                    secao.style.display = produtosVisiveis ? 'block' : 'none';
                }
            });
        }
        
        // Inicializar
        marcarProdutos();
        
        // Event listeners
        checkboxMaisVendidos.addEventListener('change', filtrarProdutos);
        checkboxNovidades.addEventListener('change', filtrarProdutos);
        
        // Estado inicial
        filtrarProdutos();
    });
}

// Para usar o sistema avançado, descomente a linha abaixo:
// sistemaFiltroAvancado();