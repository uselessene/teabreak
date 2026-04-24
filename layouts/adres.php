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
    <title>Адрес доставки</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/adres.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
    <script src="/scripts/adres.js"></script>
</head>
<body data-logged="true">
    <my-header></my-header>
    <adres-page></adres-page>
    <my-footer></my-footer>
</body>
</html>