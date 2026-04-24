function sanitize(str) {
    if (!str) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };
    const reg = /[&<>"'/]/g;
    return String(str).replace(reg, (match) => map[match]);
}

class CartPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            this.innerHTML = `
                <main>
                    <div class="cart_content">
                        <div class="cart_title">Ваш заказ</div>
                        <div class="cart_empty">Корзина пуста</div>
                    </div>
                </main>
            `;
            return;
        }
        let itemsHtml = '';
        cart = cart.map((item, idx) => {
            if (item.checked === undefined) item.checked = true;
            return item;
        });
        cart.forEach((item, index) => {
            const isChecked = item.checked !== false;
            const checkedClass = isChecked ? 'selected' : '';
            itemsHtml += `
                <div class="cart_item" data-index="${index}">
                    <div class="item_image">
                        <img src="${item.image}" alt="tea"/>
                    </div>
                    <div class="item_info">
                        <div class="item_name">${sanitize(item.name)}</div>
                        <div class="item_price">${item.price} ₽</div>
                    </div>
                    <div class="item_check ${checkedClass}" data-index="${index}"></div>
                    <div class="counter_wrapper">
                        <button class="counter_btn minus" data-index="${index}">-</button>
                        <span class="counter_value">${item.quantity}</span>
                        <button class="counter_btn plus" data-index="${index}">+</button>
                    </div>
                </div>
            `;
        });
        this.innerHTML = `
            <main>
                <div class="cart_content">
                    <div class="cart_title">Ваш заказ</div>
                    <div class="cart_list">${itemsHtml}</div>
                    <div class="divider"></div>
                    <div class="cart_footer">
                        <div class="total_label" id="totalLabel">Общая стоимость: 0 ₽</div>
                        <button class="pay_btn" id="payBtn">Оплатить</button>
                    </div>
                </div>
            </main>
        `;
        document.querySelectorAll('.item_check').forEach(cb => {
            const idx = parseInt(cb.getAttribute('data-index'));
            if (cart[idx] && cart[idx].checked) {
                cb.style.backgroundImage = "url('/src/images/galka.png')";
                cb.style.backgroundSize = "20px";
                cb.style.backgroundPosition = "center";
                cb.style.backgroundRepeat = "no-repeat";
                cb.style.backgroundColor = "#F1D0A8";
            }
        });
        this.updateTotal();
        this.setupEvents();
    }
    updateTotal() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let total = 0;
        cart.forEach(item => {
            if (item.checked !== false) {
                total += item.price * item.quantity;
            }
        });
        const totalLabel = document.getElementById('totalLabel');
        if (totalLabel) {
            totalLabel.textContent = `Общая стоимость: ${total} ₽`;
        }
    }
    setupEvents() {
        document.querySelectorAll('.item_check').forEach(cb => {
            cb.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(cb.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart[index].checked === false) {
                    cart[index].checked = true;
                    cb.classList.add('selected');
                    cb.style.backgroundImage = "url('/src/images/galka.png')";
                    cb.style.backgroundSize = "20px";
                    cb.style.backgroundPosition = "center";
                    cb.style.backgroundRepeat = "no-repeat";
                    cb.style.backgroundColor = "#F1D0A8";
                } else {
                    cart[index].checked = false;
                    cb.classList.remove('selected');
                    cb.style.backgroundImage = "none";
                    cb.style.backgroundColor = "white";
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                this.updateTotal();
            });
        });
        document.querySelectorAll('.counter_btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    this.render();
                } else {
                    if (confirm('Удалить товар из корзины?')) {
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        this.render();
                    }
                }
            });
        });
        document.querySelectorAll('.counter_btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                this.render();
            });
        });
        const payBtn = document.getElementById('payBtn');
        if (payBtn) {
            payBtn.addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const selectedItems = cart.filter(item => item.checked !== false);
                if (selectedItems.length === 0) {
                    alert('Выберите хотя бы один товар для оплаты');
                    return;
                }
                localStorage.setItem('selectedCart', JSON.stringify(selectedItems));
                window.location.href = '/layouts/oformlenie.php';
            });
        }
    }
}
customElements.define('cart-page', CartPage);