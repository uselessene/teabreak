class MyHeader extends HTMLElement {
    connectedCallback() {
        const isLoggedIn = document.body.getAttribute('data-logged') === 'true';
        if (isLoggedIn) {
            this.innerHTML = `
                <header class="header">
                    <div class="menu_icon" id="accountIcon">
                        <img src="/src/images/icon.png" alt="menu"/>
                    </div>
                    <div class="logo" id="logoBtn">
                        <img src="/src/images/logo.png" alt="logo"/>
                    </div>
                </header>
            `;
        } else {
            this.innerHTML = `
                <header class="header">
                    <div class="menu_icon" id="accountIcon">
                        <img src="/src/images/icon.png" alt="menu"/>
                    </div>
                    <div class="logo" id="logoBtn">
                        <img src="/src/images/logo.png" alt="logo"/>
                    </div>
                    <div class="auth_buttons">
                        <button class="login_btn" onclick="window.location.href='/layouts/signin.php'">Войти</button>
                        <button class="register_btn" onclick="window.location.href='/layouts/signup.php'">
                            <img src="/src/images/signin.png" alt="signin"/>
                            Зарегистрироваться
                        </button>
                    </div>
                </header>
            `;
        }
        const accountIcon = this.querySelector('#accountIcon');
        if (accountIcon) {
            accountIcon.addEventListener('click', () => {
                window.location.href = '/layouts/account.php';
            });
        }
        const logoBtn = this.querySelector('#logoBtn');
        if (logoBtn) {
            logoBtn.addEventListener('click', () => {
                window.location.href = '/index.php';
            });
        }
    }
}
customElements.define('my-header', MyHeader);