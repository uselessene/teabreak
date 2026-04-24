<?php
session_start();
$host = 'localhost';
$user = 'root';
$pass = '';
$base = 'dinarabd';
$conn = mysqli_connect($host, $user, $pass, $base);
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $query = "SELECT * FROM Users WHERE Email='$email'";
    $result = mysqli_query($conn, $query);
    $user_data = mysqli_fetch_assoc($result);
    if ($user_data && password_verify($password, $user_data['Password'])) {
        $_SESSION['user_id'] = $user_data['ID_User'];
        $_SESSION['user_login'] = $user_data['Login'];
        $_SESSION['user_email'] = $user_data['Email'];
        header('Location: /index.php');
        exit;
    } else {
        $error = 'Неверная почта или пароль';
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/signin.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
</head>
<body data-logged="<?= isset($_SESSION['user_id']) ? 'true' : 'false' ?>">
    <my-header></my-header>
    <main>
        <div class="signin_content">
            <div class="signin_image">
                <img src="/src/images/tea.png" alt="tea"/>
            </div>
            <div class="signin_form">
                <h2>Вход</h2>
                <?php if ($error): ?>
                    <p style="color: red; text-align: center;"><?= $error ?></p>
                <?php endif; ?>
                <form method="POST" action="">
                    <div class="input_group">
                        <input type="email" name="email" placeholder="Электронная почта" required>
                        <img src="/src/images/gmail.png" alt="email">
                    </div>
                    <div class="input_group">
                        <input type="password" name="password" placeholder="Пароль" required>
                        <img src="/src/images/pass.png" alt="pass">
                    </div>
                    <button type="submit" class="signin_btn">Войти</button>
                    <div class="signup_link">
                        Еще нет аккаунта? <a href="/layouts/signup.php">Зарегистрироваться</a>
                    </div>
                </form>
            </div>
        </div>
    </main>
    <my-footer></my-footer>
</body>
</html>