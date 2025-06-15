// Lista de produtos (copiados do index.html)
const produtos = [
    {
        nome: "Booster Azura",
        categoria: "Booster",
        descricao: "Hidratante Anti-Acne, Booster Azura. O Booster Azura é um poderoso aliado para a sua pele, proporcionando hidratação intensa e revitalização.",
        preco: 37.25,
        parcela: "em 12x R$ 3,66",
        imagem: "img/boosterazura.png"
    },
    {
        nome: "Booster Ilumini",
        categoria: "Booster",
        descricao: "Iluminador Facial, Booster Ilumini. O Booster Ilumini proporciona um brilho radiante e saudável para a sua pele.",
        preco: 45.90,
        parcela: "em 12x R$ 4,59",
        imagem: "img/boosterilumini.png"
    },
    {
        nome: "Breeze",
        categoria: "Bruma",
        descricao: "Bruma Hidratante, Breeze. A Bruma Breeze é refrescante e proporciona hidratação instantânea.",
        preco: 50.00,
        parcela: "em 12x R$ 5,00",
        imagem: "img/breeze.png"
    },
    {
        nome: "Clean",
        categoria: "Sabonete",
        descricao: "Sabonete Facial, Clean. O Sabonete Clean limpa profundamente e é ideal para todos os tipos de pele.",
        preco: 30.10,
        parcela: "em 12x R$ 3,01",
        imagem: "img/clean.png"
    },
    {
        nome: "Máscara Facial",
        categoria: "Máscara",
        descricao: "Máscara Facial, Mask. A Máscara Facial proporciona uma limpeza profunda e hidratação intensa.",
        preco: 60.20,
        parcela: "em 12x R$ 6,02",
        imagem: "img/mask.png"
    },
    {
        nome: "Glow Up",
        categoria: "Produto Especial",
        descricao: "Produto Especial, Glow Up. Ilumine sua rotina de cuidados com este produto especial.",
        preco: 55.00,
        parcela: "em 12x R$ 5,50",
        imagem: "img/img4.jpg"
    },
    {
        nome: "Fresh Skin",
        categoria: "Produto Especial",
        descricao: "Produto Especial, Fresh Skin. Pele renovada e hidratada todos os dias.",
        preco: 62.90,
        parcela: "em 12x R$ 6,29",
        imagem: "img/img5.jpg"
    },
    {
        nome: "Magic Touch",
        categoria: "Produto Especial",
        descricao: "Produto Especial, Magic Touch. Toque mágico para uma pele perfeita.",
        preco: 48.75,
        parcela: "em 12x R$ 4,87",
        imagem: "img/img6.jpg"
    }
];

// Função para formatar preço
function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace('.', ',');
}

// Renderiza os produtos no catálogo
function renderizarProdutos(lista) {
    const container = document.getElementById('products-container');
    if (!lista.length) {
        container.innerHTML = '<div class="empty-state">Nenhum produto encontrado.</div>';
        document.getElementById('results-count').textContent = 0;
        return;
    }
    let html = '<div class="product-grid">';
    lista.forEach(prod => {
        html += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${prod.imagem}" alt="${prod.nome}">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${prod.categoria}</div>
                        <div class="product-title">${prod.nome}</div>
                        <div class="product-description">${prod.descricao}</div>
                        <div class="product-price">
                            <span class="price-current">${formatarPreco(prod.preco)}</span>
                            <span class="price-installment">${prod.parcela}</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn-add-cart">Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>
                `;
    });
    html += '</div>';
    container.innerHTML = html;
    document.getElementById('results-count').textContent = lista.length;
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    renderizarProdutos(produtos);
    document.getElementById('loading-state')?.remove();
});