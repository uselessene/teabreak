<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Корзина</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/cart.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
    <script src="/scripts/cart.js"></script>
</head>
<body data-logged="<?= isset($_SESSION['user_id']) ? 'true' : 'false' ?>">
    <my-header></my-header>
    <cart-page></cart-page>
    <my-footer></my-footer>
</body>
</html>