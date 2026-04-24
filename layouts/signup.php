<?php
session_start();
$host = 'localhost';
$user = 'root';
$pass = '';
$base = 'dinarabd';
$conn = mysqli_connect($host, $user, $pass, $base);
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm'];
    
    if (empty($login) || empty($email) || empty($password) || empty($confirm)) {
        $error = 'Заполните все поля';
    } elseif ($password !== $confirm) {
        $error = 'Пароли не совпадают';
    } else {
        $check = "SELECT * FROM Users WHERE Login='$login' OR Email='$email'";
        $result = mysqli_query($conn, $check);
        if (mysqli_num_rows($result) > 0) {
            $error = 'Пользователь с таким логином или email уже существует';
        } else {
            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO Users (Login, Email, Password) VALUES ('$login', '$email', '$hashed')";
            if (mysqli_query($conn, $query)) {
                header('Location: signin.php');
                exit;
            } else {
                $error = 'Ошибка регистрации: ' . mysqli_error($conn);
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Регистрация</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/signup.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
</head>
<body data-logged="<?= isset($_SESSION['user_id']) ? 'true' : 'false' ?>">
    <my-header></my-header>
    <main>
        <div class="signup_content">
            <div class="signup_image">
                <img src="/src/images/tea.png" alt="tea"/>
            </div>
            <div class="signup_form">
                <h2>Регистрация</h2>
                <?php if ($error): ?>
                    <p style="color: red; text-align: center;"><?= $error ?></p>
                <?php endif; ?>
                <form method="POST" action="">
                    <div class="input_group">
                        <input type="text" name="login" placeholder="Логин" required>
                        <img src="/src/images/acc.png" alt="login">
                    </div>
                    <div class="input_group">
                        <input type="email" name="email" placeholder="Электронная почта" required>
                        <img src="/src/images/gmail.png" alt="email">
                    </div>
                    <div class="input_group">
                        <input type="password" name="password" placeholder="Пароль" required>
                        <img src="/src/images/pass.png" alt="password">
                    </div>
                    <div class="input_group">
                        <input type="password" name="confirm" placeholder="Подтвердить пароль" required>
                        <img src="/src/images/pass.png" alt="confirm">
                    </div>
                    <button type="submit" class="signup_btn">Зарегистрироваться</button>
                    <div class="signin_link">
                        Уже есть аккаунт? <a href="signin.php">Войти</a>
                    </div>
                </form>
            </div>
        </div>
    </main>
    <my-footer></my-footer>
</body>
</html>