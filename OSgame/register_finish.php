<!--加入(註冊)會員 - 「新增」會員資料進MySQL資料庫 (register_finish.php)-->
<?php session_start(); ?>
<?php
  include("mysql_connect.inc.php");

  $id = $_GET['id'] ;
  $pw = $_GET['pw'] ;
  $email =  $_GET['email'] ;
  //判斷帳號密碼是否為空值
  //確認密碼輸入的正確性
  
  if($id != null && $pw != null  ) {
    $sql = "SELECT * FROM user_info where account = '$id'";
	$result = mysql_query($sql);
    $row = mysql_fetch_row($result);
	if ( $id == $row[1] ) {
	  echo '帳號已經有人使用!';
      echo '<meta http-equiv=REFRESH CONTENT=2;url=osgame.html>';
	} // if
	
	else {       
      $sql = "insert into user_info (account, password, email) values ('$id', '$pw', '$email' )";
      if( mysql_query( $sql ) ) {
              echo '註冊成功!';
              echo '<meta http-equiv=REFRESH CONTENT=2;url=oslogin.html>';
      }
      else {
              echo '註冊失敗!';
              echo '<meta http-equiv=REFRESH CONTENT=2;url=osgame.html>';
      }
	} // else
  }
  
  else {
          echo '註冊失敗!';
          echo '<meta http-equiv=REFRESH CONTENT=2;url=osgame.html>';
  }
?>
<script>
sessionStorage.uid = <?php echo $uid ; ?>
</script>