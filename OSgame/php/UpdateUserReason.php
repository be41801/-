<?php

require_once('DBconfig.php');

  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
    $qid = $_POST['qid'];
    $reason = $_POST['reason'];  
    $sql = "insert into user_reason (uid,qid, reason) values ('$uid','$qid', '$reason')";
    $result = mysql_query($sql);
  }
  else
    echo 'no' ;

?>