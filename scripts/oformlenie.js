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

class OformleniePage extends HTMLElement {
    connectedCallback() {
        this.loadData();
    }
    loadData() {
        const cart = JSON.parse(localStorage.getItem('selectedCart') || '[]');
        if (cart.length === 0) {
            window.location.href = '/layouts/cart.php';
            return;
        }
        let itemsHtml = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHtml += `
                <div class="selected_item">
                    <img src="${item.image}" alt="tea"/>
                    <div class="selected_item_info">
                        <div class="selected_item_name">${sanitize(item.name)}</div>
                        <div class="selected_item_price">${item.price} ₽ x ${item.quantity} = ${itemTotal} ₽</div>
                    </div>
                </div>
            `;
        });
        const addressText = (typeof savedAddress !== 'undefined' && savedAddress && savedAddress !== '') ? savedAddress : 'Не выбран';
        this.innerHTML = `
            <main>
                <div class="oformlenie_content">
                    <div class="selected_items">${itemsHtml}</div>
                    <div class="payment_row">
                        <div class="payment_card">Карта: MIR02*******2022</div>
                        <div class="address_block" id="addressBtn">Адрес: ${addressText}</div>
                    </div>
                    <div class="total_block">
                        <div class="total_text">Общая стоимость: ${total} ₽</div>
                    </div>
                    <button class="confirm_btn" id="confirmBtn">Подтвердить</button>
                </div>
            </main>
        `;
        document.getElementById('addressBtn')?.addEventListener('click', () => {
            window.location.href = '/layouts/adres.php';
        });
        document.getElementById('confirmBtn')?.addEventListener('click', async () => {
            const cart = JSON.parse(localStorage.getItem('selectedCart') || '[]');
            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const response = await fetch('/layouts/oformlenie.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'create_order', cart: cart, total: totalAmount })
            });
            const result = await response.json();
            if (result.success) {
                let fullCart = JSON.parse(localStorage.getItem('cart') || '[]');
                const selectedIds = cart.map(item => item.id);
                const remainingCart = fullCart.filter(item => !selectedIds.includes(item.id));
                localStorage.setItem('cart', JSON.stringify(remainingCart));
                localStorage.removeItem('selectedCart');
                alert('Заказ оформлен!');
                window.location.href = '/index.php';
            } else {
                alert('Ошибка оформления заказа: ' + (result.error || 'неизвестная ошибка'));
            }
        });
    }
}
customElements.define('oformlenie-page', OformleniePage);