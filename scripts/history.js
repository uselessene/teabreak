class HistoryPage extends HTMLElement {
    connectedCallback() {
        this.loadHistory();
    }
    loadHistory() {
        if (typeof ordersFromDB !== 'undefined' && ordersFromDB.length > 0) {
            let historyHtml = '';
            ordersFromDB.forEach(order => {
                let statusText = 'В обработке';
                let statusClass = 'status_btn';
                if (order.Delivered == 1) {
                    statusText = 'Доставлен';
                    statusClass = 'status_delivered';
                } else if (order.Processing == 1) {
                    statusText = 'В обработке';
                    statusClass = 'status_btn';
                }
                const addressText = order.Address || 'Адрес не указан';
                
                historyHtml += `
                    <div class="history_card">
                        <div class="status_info">
                            <div class="${statusClass}">${statusText}</div>
                            <div class="order_sum">Сумма: ${order.Sum} ₽</div>
                            <div class="order_number">Номер заказа: ${order.Numbers_Orders}</div>
                            <div class="order_address">Адрес доставки: ${addressText}</div>
                        </div>
                    </div>
                `;
            });
            this.innerHTML = `
                <main>
                    <div class="history_content">
                        <div class="history_title">История заказов</div>
                        <div class="history_grid">${historyHtml}</div>
                    </div>
                </main>
            `;
        } else {
            this.innerHTML = `
                <main>
                    <div class="history_content">
                        <div class="history_title">История заказов</div>
                        <p>У вас пока нет заказов</p>
                    </div>
                </main>
            `;
        }
    }
}
customElements.define('history-page', HistoryPage);