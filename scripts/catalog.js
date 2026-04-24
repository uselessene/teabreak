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

class CatalogPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <div class="catalog_content">
                    <div class="catalog_header">
                        <div class="filter_wrapper">
                            <button class="filter_main_btn" id="filterBtn">Список ▼</button>
                            <div class="filter_dropdown" id="filterDropdown">
                                <div class="filter_category">
                                    <div class="filter_category_title">Музыка <span class="arrow">▼</span></div>
                                    <div class="filter_sub">
                                        <label><input type="checkbox" value="Классическая"> Классическая</label>
                                        <label><input type="checkbox" value="Джаз"> Джаз</label>
                                        <label><input type="checkbox" value="Рок"> Рок</label>
                                        <label><input type="checkbox" value="Электронная"> Электронная</label>
                                        <label><input type="checkbox" value="Хип-хоп"> Хип-хоп</label>
                                    </div>
                                </div>
                                <div class="filter_category">
                                    <div class="filter_category_title">Литература <span class="arrow">▼</span></div>
                                    <div class="filter_sub">
                                        <label><input type="checkbox" value="Фэнтези"> Фэнтези</label>
                                        <label><input type="checkbox" value="Детективы"> Детективы</label>
                                        <label><input type="checkbox" value="Научная фантастика"> Научная фантастика</label>
                                        <label><input type="checkbox" value="Классика"> Классика</label>
                                        <label><input type="checkbox" value="Поэзия"> Поэзия</label>
                                    </div>
                                </div>
                                <div class="filter_category">
                                    <div class="filter_category_title">Игры <span class="arrow">▼</span></div>
                                    <div class="filter_sub">
                                        <label><input type="checkbox" value="Стратегии"> Стратегии</label>
                                        <label><input type="checkbox" value="Инди"> Инди</label>
                                        <label><input type="checkbox" value="Экшн"> Экшн</label>
                                        <label><input type="checkbox" value="Приключения"> Приключения</label>
                                        <label><input type="checkbox" value="Хоррор"> Хоррор</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="catalog_right_logo">
                            <img src="/src/images/logo2.png" alt="logo"/>
                        </div>
                    </div>
                    <div class="catalog_grid" id="catalogGrid"></div>
                </div>
            </main>
        `;
        this.renderProducts();
        this.setupFilters();
    }
    renderProducts() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (typeof productsFromDB !== 'undefined' && productsFromDB.length > 0) {
        productsFromDB.forEach(product => {
            const imagePath = product.Image ? product.Image.replace(/\\/g, '/') : '/src/images/chai.png';
            const typeTea = product.Type_Tea || '';
            
            const card = document.createElement('div');
            card.className = 'tea_card';
            card.setAttribute('data-id', product.ID_Tea);
            card.setAttribute('data-name', sanitize(product.Name_Tea));
            card.setAttribute('data-price', product.Price);
            card.setAttribute('data-image', imagePath);
            card.setAttribute('data-type', sanitize(product.Type_Tea));
            card.innerHTML = `
                <div class="tea_card_type">${sanitize(typeTea)}</div>
                <img src="${imagePath}" alt="${sanitize(product.Name_Tea)}">
                <div class="tea_card_title">${sanitize(product.Name_Tea)}</div>
                <div class="tea_card_description">${sanitize(product.Description)}</div>
                <div class="tea_card_price">${product.Price} ₽</div>
                <img src="/src/images/plus.png" class="add_to_cart" alt="add">
            `;
            const addBtn = card.querySelector('.add_to_cart');
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart(product);
            });
            grid.appendChild(card);
        });
    } else {
        grid.innerHTML = '<div class="no_products">Товары не найдены</div>';
    }
}
    addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(item => item.id == product.ID_Tea);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id: product.ID_Tea,
                name: sanitize(product.Name_Tea),
                price: product.Price,
                image: product.Image ? product.Image.replace(/\\/g, '/') : '/src/images/chai.png',
                quantity: 1,
                checked: true
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Товар добавлен в корзину');
    }
    setupFilters() {
        const filterBtn = document.getElementById('filterBtn');
        const filterDropdown = document.getElementById('filterDropdown');
        if (filterBtn && filterDropdown) {
            filterBtn.addEventListener('click', () => {
                filterDropdown.classList.toggle('show');
            });
        }
        const categories = document.querySelectorAll('.filter_category');
        categories.forEach(cat => {
            const title = cat.querySelector('.filter_category_title');
            const sub = cat.querySelector('.filter_sub');
            const arrow = title?.querySelector('.arrow');
            if (title && sub && arrow) {
                title.addEventListener('click', (e) => {
                    e.stopPropagation();
                    sub.classList.toggle('show');
                    arrow.classList.toggle('rotated');
                });
            }
        });
        const checkboxes = document.querySelectorAll('.filter_sub input');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => this.filterProducts());
        });
    }
    filterProducts() {
        const selected = [];
        const checkboxes = document.querySelectorAll('.filter_sub input:checked');
        checkboxes.forEach(cb => selected.push(cb.value));
        const cards = document.querySelectorAll('.tea_card');
        if (selected.length === 0) {
            cards.forEach(card => card.style.display = '');
        } else {
            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (selected.includes(cardType)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }
}
customElements.define('catalog-page', CatalogPage);