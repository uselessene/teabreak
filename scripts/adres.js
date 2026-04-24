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

class AdresPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <div class="adres_content">
                    <div class="adres_title">Ввести адрес доставки или выбрать на карте:</div>
                    <button class="map_btn" id="mapBtn">Открыть карту</button>
                    <div class="not_selected" id="notSelected">Не выбрано</div>
                    <div class="address_label">Адрес доставки</div>
                    <input type="text" class="address_input" id="addressInput" placeholder="">
                    <button class="confirm_adres_btn" id="confirmAdresBtn">Подтвердить</button>
                </div>
            </main>
        `;
        document.getElementById('mapBtn')?.addEventListener('click', () => alert('Функция карты в разработке'));
        document.getElementById('confirmAdresBtn')?.addEventListener('click', async () => {
            let address = document.getElementById('addressInput').value;
            if (address) {
                address = sanitize(address);
                const response = await fetch('/layouts/oformlenie.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'save_address', address: address })
                });
                const result = await response.json();
                if (result.success) {
                    const notSelected = document.getElementById('notSelected');
                    if (notSelected) {
                        notSelected.textContent = 'Адрес сохранен';
                        notSelected.style.color = 'green';
                    }
                    alert('Адрес сохранен');
                    window.location.href = '/layouts/oformlenie.php';
                } else {
                    alert('Ошибка сохранения адреса');
                }
            } else {
                alert('Введите адрес');
            }
        });
    }
}
customElements.define('adres-page', AdresPage);