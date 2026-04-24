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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action']) && $data['action'] === 'save_address') {
        $address = $data['address'];
        $query = "UPDATE Users SET Address = '$address' WHERE ID_User = $userId";
        mysqli_query($conn, $query);
        echo json_encode(['success' => true]);
        exit;
    }
    
    if (isset($data['action']) && $data['action'] === 'create_order') {
        $cart = $data['cart'];
        $total = $data['total'];
        $orderNumber = rand(100000, 999999);
        
        $addressQuery = "SELECT Address FROM Users WHERE ID_User = $userId";
        $addressResult = mysqli_query($conn, $addressQuery);
        $addressRow = mysqli_fetch_assoc($addressResult);
        $userAddress = $addressRow['Address'] ?? '';
        
        $query = "INSERT INTO Orders (ID_User, Numbers_Orders, Sum, Address) VALUES ($userId, '$orderNumber', $total, '$userAddress')";
        $result = mysqli_query($conn, $query);
        
        if ($result) {
            $orderId = mysqli_insert_id($conn);
            $statusQuery = "INSERT INTO Status (ID_Orders, Processing) VALUES ($orderId, 1)";
            mysqli_query($conn, $statusQuery);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
        }
        exit;
    }
}

$query = "SELECT Address FROM Users WHERE ID_User = $userId";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
$savedAddress = $row['Address'] ?? '';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Оформление</title>
    <link rel="stylesheet" href="/style/components/background.css">
    <link rel="stylesheet" href="/style/components/header.css">
    <link rel="stylesheet" href="/style/components/footer.css">
    <link rel="stylesheet" href="/style/components/fonts.css">
    <link rel="stylesheet" href="/style/components/oformlenie.css">
    <script src="/scripts/header.js"></script>
    <script src="/scripts/footer.js"></script>
    <script>
        const savedAddress = <?php echo json_encode($savedAddress); ?>;
    </script>
    <script src="/scripts/oformlenie.js"></script>
</head>
<body data-logged="true">
    <my-header></my-header>
    <oformlenie-page></oformlenie-page>
    <my-footer></my-footer>
</body>
</html>