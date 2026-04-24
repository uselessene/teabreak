class AccountPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <div class="account_content">
                    <div class="account_left">
                        <div class="account_title">Аккаунт</div>
                        <div class="profile_card">
                            <div class="profile_row">
                                <span class="profile_label">${userLogin}</span>
                                <span class="profile_value">
                                    <img src="/src/images/acc.png" alt="acc"/>
                                </span>
                            </div>
                            <div class="email_row">
                                <img src="/src/images/gmail.png" alt="gmail"/>
                                <span class="email_text">${userEmail}</span>
                            </div>
                            <button class="settings_btn" id="settingsBtn">Настройки</button>
                        </div>
                    </div>
                    <div class="account_right">
                        <div class="big_icon">
                            <img src="/src/images/iconbig.png" alt="icon"/>
                        </div>
                        <button class="history_btn" id="historyBtn">История заказов</button>
                        <button class="logout_btn" id="logoutBtn">Выйти</button>
                    </div>
                </div>
            </main>
        `;
        document.getElementById('settingsBtn')?.addEventListener('click', () => alert('Настройки в разработке'));
        document.getElementById('historyBtn')?.addEventListener('click', () => window.location.href = '/layouts/history.php');
        document.getElementById('logoutBtn')?.addEventListener('click', () => window.location.href = '/layouts/logout.php');
    }
}
customElements.define('account-page', AccountPage);