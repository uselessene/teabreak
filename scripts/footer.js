class MyFooter extends HTMLElement {
    connectedCallback() {
        const isLoggedIn = document.body.getAttribute('data-logged') === 'true';
        if (isLoggedIn) {
            this.innerHTML = `
                <footer class="footer">
                    <div class="footer_left">
                        <img src="/src/images/left.png" alt="left" id="leftBtn"/>
                        <img src="/src/images/right.png" alt="right" id="rightBtn"/>
                    </div>
                </footer>
            `;
        } else {
            this.innerHTML = `
                <footer class="footer">
                    <div class="footer_left">
                        <img src="/src/images/left.png" alt="left" id="leftBtn"/>
                        <img src="/src/images/right.png" alt="right" id="rightBtn"/>
                    </div>
                    <div class="footer_right">
                        dinara.s@gmail.com
                    </div>
                </footer>
            `;
        }
        const leftBtn = this.querySelector('#leftBtn');
        const rightBtn = this.querySelector('#rightBtn');
        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                window.history.back();
            });
        }
        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                window.location.href = '/layouts/catalog.php';
            });
        }
    }
}
customElements.define('my-footer', MyFooter);