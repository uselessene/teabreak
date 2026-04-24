class GlavnayaPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <div class="glavnaya_content">
                    <div class="title">Выбор твоего идеального чая!</div>
                    <div class="filter_buttons">
                        <button class="filter_btn">Популярное</button>
                        <button class="filter_btn">Новинки</button>
                        <button class="filter_btn">Сезонные</button>
                    </div>
                    <div class="main_section">
                        <div class="left_buttons">
                            <button class="podobrat_btn" onclick="window.location.href='/layouts/catalog.php'">Подобрать</button>
                            <button class="korzina_btn" onclick="window.location.href='/layouts/cart.php'">Корзина</button>
                        </div>
                        <div class="right_image">
                            <img src="/src/tea_image/14.png" alt="tea"/>
                        </div>
                    </div>
                    <div class="bottom_logo">
                        <img src="/src/images/logo2.png" alt="logo"/>
                    </div>
                </div>
            </main>
        `;
    }
}
customElements.define('glavnaya-page', GlavnayaPage);