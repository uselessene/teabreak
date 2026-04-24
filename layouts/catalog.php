<?php
session_start();
$host = 'localhost';
$user = 'root';
$pass = '';
$base = 'dinarabd';
$conn = mysqli_connect($host, $user, $pass, $base);
$query = "SELECT * FROM Tea";
$result = mysqli_query($conn, $query);
$products = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Каталог</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/catalog.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
    <script>
        const productsFromDB = <?php echo json_encode($products); ?>;
    </script>
    <script src="/scripts/catalog.js"></script>
</head>
<body data-logged="<?= isset($_SESSION['user_id']) ? 'true' : 'false' ?>">
    <my-header></my-header>
    <catalog-page></catalog-page>
    <my-footer></my-footer>
</body>
</html>