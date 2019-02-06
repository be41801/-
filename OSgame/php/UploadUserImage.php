<?php

require_once('DBconfig.php');
  echo $uid;
  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
	$img = $_POST['img'];
	$sql = "update user_info set img='$img' where uid='$uid'";
    $result = mysql_query($sql);

  }
  else
    echo 'no' ;

?>