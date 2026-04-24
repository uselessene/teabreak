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

class SigninPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <div class="signin_content">
                    <div class="signin_image">
                        <img src="/src/images/tea.png" alt="tea"/>
                    </div>
                    <div class="signin_form">
                        <h2>Вход</h2>
                        <div id="errorMsg" class="error_msg" style="color: red; text-align: center; margin-bottom: 15px; display: none;"></div>
                        <div class="input_group">
                            <input type="email" id="loginEmail" placeholder="Электронная почта">
                            <img src="/src/images/gmail.png" alt="gmail">
                        </div>
                        <div class="input_group">
                            <input type="password" id="loginPassword" placeholder="Пароль">
                            <img src="/src/images/pass.png" alt="pass">
                        </div>
                        <button class="signin_btn" id="loginBtn">Войти</button>
                        <div class="signup_link">
                            Еще нет аккаунта? <a href="/layouts/signup.php">Зарегистрироваться</a>
                        </div>
                    </div>
                </div>
            </main>
        `;
        
        const loginBtn = this.querySelector('#loginBtn');
        const errorMsg = this.querySelector('#errorMsg');
        
        loginBtn.addEventListener('click', async () => {
            let email = this.querySelector('#loginEmail').value;
            let password = this.querySelector('#loginPassword').value;
            
            if (!email || !password) {
                errorMsg.textContent = 'Заполните все поля';
                errorMsg.style.display = 'block';
                return;
            }
            
            email = sanitize(email);
            
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);
            
            const response = await fetch('/layouts/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                window.location.href = '/index.php';
            } else {
                errorMsg.textContent = result.error || 'Неверная почта или пароль';
                errorMsg.style.display = 'block';
            }
        });
    }
}
customElements.define('signin-page', SigninPage);