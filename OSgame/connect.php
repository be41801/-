<?php session_start(); ?>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
</body>
<?php
//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
require_once('mysql_connect.inc.php');

$id =  $_GET['id'] ;
$pw =  $_GET['pw'] ;
//搜尋資料庫資料
$sql = "SELECT * FROM user_info where account = '$id'";
$result = mysql_query($sql);
$row = mysql_fetch_row($result);
//判斷帳號與密碼是否為空白
//以及MySQL資料庫裡是否有這個會員

if($id != null && $pw != null && $row[1] == $id && $row[2] == $pw) {
        $uid = $row[0];
		$sql = "update user_info set last_Login = now() where account = '$id'";
		$result = mysql_query($sql);
        echo '<meta http-equiv=REFRESH CONTENT=1;url=index.html>';
		
}
else
{
        print_r( "登入失敗!"); 
        echo '<meta http-equiv=REFRESH CONTENT=1;url=oslogin.html>';
}

?>
<script>
sessionStorage.uid = <?php echo $uid ; ?>
</script>