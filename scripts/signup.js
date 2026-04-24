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

class SignupPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <div class="signup_content">
                    <div class="signup_image">
                        <img src="/src/images/tea.png" alt="tea"/>
                    </div>
                    <div class="signup_form">
                        <h2>Регистрация</h2>
                        <div id="errorMsg" class="error_msg" style="color: red; text-align: center; margin-bottom: 15px; display: none;"></div>
                        <div class="input_group">
                            <input type="text" id="regLogin" placeholder="Логин">
                            <img src="/src/images/acc.png" alt="login">
                        </div>
                        <div class="input_group">
                            <input type="email" id="regEmail" placeholder="Электронная почта">
                            <img src="/src/images/gmail.png" alt="email">
                        </div>
                        <div class="input_group">
                            <input type="password" id="regPassword" placeholder="Пароль">
                            <img src="/src/images/pass.png" alt="password">
                        </div>
                        <div class="input_group">
                            <input type="password" id="regConfirm" placeholder="Подтвердить пароль">
                            <img src="/src/images/pass.png" alt="confirm">
                        </div>
                        <button class="signup_btn" id="registerBtn">Зарегистрироваться</button>
                        <div class="signin_link">
                            Уже есть аккаунт? <a href="/layouts/signin.php">Войти</a>
                        </div>
                    </div>
                </div>
            </main>
        `;
        
        const registerBtn = this.querySelector('#registerBtn');
        const errorMsg = this.querySelector('#errorMsg');
        
        registerBtn.addEventListener('click', async () => {
            let login = this.querySelector('#regLogin').value;
            let email = this.querySelector('#regEmail').value;
            let password = this.querySelector('#regPassword').value;
            let confirm = this.querySelector('#regConfirm').value;
            
            if (!login || !email || !password || !confirm) {
                errorMsg.textContent = 'Заполните все поля';
                errorMsg.style.display = 'block';
                return;
            }
            
            if (password !== confirm) {
                errorMsg.textContent = 'Пароли не совпадают';
                errorMsg.style.display = 'block';
                return;
            }
            
            login = sanitize(login);
            email = sanitize(email);
            
            const formData = new URLSearchParams();
            formData.append('login', login);
            formData.append('email', email);
            formData.append('password', password);
            
            const response = await fetch('/layouts/api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Регистрация успешна');
                window.location.href = '/layouts/signin.php';
            } else {
                errorMsg.textContent = result.error || 'Ошибка регистрации';
                errorMsg.style.display = 'block';
            }
        });
    }
}
customElements.define('signup-page', SignupPage);