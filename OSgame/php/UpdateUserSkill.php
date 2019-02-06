<?php

require_once('DBconfig.php');

  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
    $gashaimg = $_POST['gashaimg'];
    $p_money = $_POST['p_money'];
    $sql = "insert into gashapon (uid, gashaimg) values ('$uid', '$gashaimg')";
    $result = mysql_query($sql);

    $sql = "update user_info set p_money=$p_money where uid='$uid'";
    $result = mysql_query($sql);
  
  }
  else
    echo 'no' ;

?>