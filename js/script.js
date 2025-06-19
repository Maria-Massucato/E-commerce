// Validação do formulário de newsletter (nome e e-mail)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newsletterForm');
    const nameInput = document.getElementById('newsletterName');
    const emailInput = document.getElementById('newsletterEmail');
    const successMsg = document.getElementById('newsletterSuccess');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        if (!nameInput.value.trim()) {
            nameInput.classList.add('is-invalid');
            valid = false;
        } else {
            nameInput.classList.remove('is-invalid');
        }

        if (!emailInput.checkValidity()) {
            emailInput.classList.add('is-invalid');
            valid = false;
        } else {
            emailInput.classList.remove('is-invalid');
        }

        if (valid) {
            successMsg.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
        } else {
            successMsg.classList.add('d-none');
            form.classList.add('was-validated');
        }
    });
});


// JS da página de Carrinho
const sampleProducts = [
    {
        id: 1,
        name: "Booster Azura",
        description: "Hidratante Anti-Acne",
        price: 37.25,
        image: "img/boosterazura.png"
    },
    {
        id: 2,
        name: "Booster Ilumini",
        description: "Iluminador Facial",
        price: 45.90,
        image: "img/boosterilumini.png"
    },
    {
        id: 3,
        name: "Breeze",
        description: "Bruma Hidratante",
        price: 50.00,
        image: "img/breeze.png"
    },
    {
        id: 4,
        name: "Clean",
        description: "Sabonete Facial",
        price: 30.10,
        image: "img/clean.png"
    },
    {
        id: 5,
        name: "Mask",
        description: "Máscara Facial",
        price: 60.20,
        image: "img/mask.png"
    }
];

// Carrinho de compras
let cart = [];
let appliedCoupon = null;
const freeShippingThreshold = 100.00;
const shippingCost = 15.00;

// Valid coupons
const validCoupons = {
    'PRIMEIRA10': { discount: 0.10, description: '10% de desconto' },
    'SKINCARE15': { discount: 0.15, description: '15% de desconto' },
    'MXTCS20': { discount: 0.20, description: '20% de desconto' }
};

// inicializa o carrinho
function initializeCart() {
    // Adiciona alguns itens de exemplo para demonstrar a funcionalidade do carrinho
    cart = [
        { ...sampleProducts[0], quantity: 2 },
        { ...sampleProducts[1], quantity: 1 },
        { ...sampleProducts[2], quantity: 1 }
    ];
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    const cartCount = document.getElementById('cart-count');
    const shippingProgress = document.getElementById('shipping-progress');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        shippingProgress.style.display = 'none';
        cartCount.textContent = '0 itens no carrinho';
        return;
    }

    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    shippingProgress.style.display = 'block';

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'} no carrinho`;

    cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
        <div class="row align-items-center">
            <div class="col-md-2 col-3">
                <img src="${item.image}" alt="${item.name}" class="product-image">
            </div>
            <div class="col-md-4 col-9">
                <h6 class="mb-1">${item.name}</h6>
                <small class="text-muted">${item.description}</small>
            </div>
            <div class="col-md-2 col-4 text-center">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}"
                        onchange="updateQuantity(${item.id}, this.value)" min="1">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="col-md-2 col-4 text-center">
                <strong>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
            </div>
            <div class="col-md-2 col-4 text-center">
                <button class="remove-btn" onclick="removeItem(${item.id})" title="Remover item">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    </div>
    `).join('');

    updateSummary();
    updateShippingProgress();
}

function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }

    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        updateCartDisplay();
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
    const finalSubtotal = subtotal - discountAmount;
    const shipping = finalSubtotal >= freeShippingThreshold ? 0 : shippingCost;
    const total = finalSubtotal + shipping;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('shipping-cost').textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    const discountRow = document.getElementById('discount-row');
    if (appliedCoupon) {
        discountRow.style.display = 'flex';
        document.getElementById('discount').textContent = `-R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
    } else {
        discountRow.style.display = 'none';
    }
}

function updateShippingProgress() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    const remaining = Math.max(freeShippingThreshold - subtotal, 0);

    document.getElementById('progress-fill').style.width = `${progress}%`;

    const shippingInfo = document.getElementById('shipping-info');
    if (remaining > 0) {
        shippingInfo.textContent = `Adicione mais R$ ${remaining.toFixed(2).replace('.', ',')} para ganhar frete grátis!`;
        shippingInfo.style.color = '#666';
    } else {
        shippingInfo.textContent = '🎉 Parabéns! Você ganhou frete grátis!';
        shippingInfo.style.color = '#28a745';
    }
}

function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    const couponMessage = document.getElementById('coupon-message');

    if (!couponCode) {
        couponMessage.textContent = 'Digite um código de cupom';
        couponMessage.style.color = '#dc3545';
        return;
    }

    if (validCoupons[couponCode]) {
        appliedCoupon = validCoupons[couponCode];
        couponMessage.textContent = `✓ Cupom aplicado: ${appliedCoupon.description}`;
        couponMessage.style.color = '#28a745';
        document.getElementById('coupon-code').disabled = true;
        updateSummary();
    } else {
        couponMessage.textContent = 'Cupom inválido';
        couponMessage.style.color = '#dc3545';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Simula o processo de checkout
    const total = document.getElementById('total').textContent;
    alert(`Redirecionando para o pagamento...\nTotal: ${total}\n\nObrigado por escolher MXTCS Skincare! 💜`);

    // Em uma aplicação real, isso redirecionaria para um processador de pagamento
    // window.location.href = 'checkout.html';
}

// Função para adicionar item ao carrinho (pode ser chamada a partir das páginas de produtos)
function addToCart(productId, quantity = 1) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCartDisplay();
}

// Inicializa o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    initializeCart();
});