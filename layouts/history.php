<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: signin.php');
    exit;
}
$host = 'localhost';
$user = 'root';
$pass = '';
$base = 'dinarabd';
$conn = mysqli_connect($host, $user, $pass, $base);
$userId = $_SESSION['user_id'];

$query = "SELECT o.*, s.Processing, s.Delivered 
          FROM Orders o 
          LEFT JOIN Status s ON o.ID_Orders = s.ID_Orders 
          WHERE o.ID_User = $userId 
          ORDER BY o.ID_Orders DESC";
$result = mysqli_query($conn, $query);
$orders = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>История заказов</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/history.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
    <script>
        const ordersFromDB = <?php echo json_encode($orders); ?>;
    </script>
    <script src="/scripts/history.js"></script>
</head>
<body data-logged="true">
    <my-header></my-header>
    <history-page></history-page>
    <my-footer></my-footer>
</body>
</html>