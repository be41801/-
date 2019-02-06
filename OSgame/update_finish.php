<!--修改會員資料 - 「更新」要修改之會員資料進MySQL資料庫(update_finish.php)-->
<?php session_start(); ?>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
include("mysql_connect.inc.php");

$id = $_POST['id'];
$pw = $_POST['pw'];
$pw2 = $_POST['pw2'];
$realName = $_POST['realName'];
$email = $_POST['email'];
//紅色字體為判斷密碼是否填寫正確
if($_SESSION['account'] != null && $pw != null && $pw2 != null && $pw == $pw2)
{
        $id = $_SESSION['account'];
    
        //更新資料庫資料語法
        $sql = "update user_info set password=$pw, realName=$realName, email=$email, other=$other where account='$id'";
        if(mysql_query($sql))
        {
                echo '修改成功!';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=member.php>';
        }
        else
        {
                echo '修改失敗!';
                echo '<meta http-equiv=REFRESH CONTENT=2;url=member.php>';
        }
}
else
{
        echo '您無權限觀看此頁面!';
        echo '<meta http-equiv=REFRESH CONTENT=2;url=oslogin.html>';
}
?>