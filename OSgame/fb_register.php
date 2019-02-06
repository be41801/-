<!--加入(註冊)會員 - 「新增」會員資料進MySQL資料庫 (register_finish.php)-->
<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<?php
require_once("mysql_connect.inc.php");

$id = $_GET['id'] ;
$email = $_GET['email'] ;
//判斷帳號密碼是否為空值
//確認密碼輸入的正確性
$sql = "SELECT * FROM user_info where account = '$id'";
$result = mysql_query($sql) ;
$row = mysql_fetch_row($result);

if($email !=  NULL && $email == $row[4] ) {
  $uid = $row[0];
  $sql = "update user_info set last_Login = now() where account = '$id'";
  $result = mysql_query($sql); 
  echo '<meta http-equiv=REFRESH CONTENT=2;url=index.html>';
}

else 
{
        //新增資料進資料庫語法
        $sql = "insert into user_info (account, email) values ('$id', '$email' )";
		if(mysql_query($sql))
        {
                echo '新增成功!';
				$sql = "SELECT * FROM user_info where account = '$id'";
                $result = mysql_query($sql);
                $row = mysql_fetch_row($result);
                $uid = $row[0];
				$sql = "update user_info set last_Login = now() where account = '$id'";
				$result = mysql_query($sql);
                echo '<meta http-equiv=REFRESH CONTENT=2;url=index.html>';
        }
        else
        {
                echo '新增失敗!';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=login.html>';
        }
}

?>

<script>
sessionStorage.uid = <?php echo $uid ; ?>
</script>