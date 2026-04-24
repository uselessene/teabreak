<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: signin.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Аккаунт</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/account.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
    <script>
        const userLogin = <?php echo json_encode($_SESSION['user_login']); ?>;
        const userEmail = <?php echo json_encode($_SESSION['user_email']); ?>;
    </script>
    <script src="/scripts/account.js"></script>
</head>
<body data-logged="true">
    <my-header></my-header>
    <account-page></account-page>
    <my-footer></my-footer>
</body>
</html>