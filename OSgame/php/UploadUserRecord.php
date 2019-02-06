<?php

require_once('DBconfig.php');

  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
	$cid = $_POST['cid'];
    $win_rate = $_POST['win_rate'];
    $qid1 = $_POST['qid1'];
    $qid2 = $_POST['qid2']; 
    $qid3 = $_POST['qid3'];
    $qid4 = $_POST['qid4'];
    $qid5 = $_POST['qid5']; 
    $answer1 = $_POST['answer1'];  
    $answer2 = $_POST['answer2']; 
    $answer3 = $_POST['answer3']; 
    $answer4 = $_POST['answer4']; 
    $answer5 = $_POST['answer5']; 
	$exp = $_POST['exp'];
    $p_money = $_POST['p_money'];
	$user_winRate = 0.00;
    $sql = "insert into user_record (uid, cid, win_Rate, qid1, qid2, qid3, qid4,qid5,answer1,answer2,answer3,answer4,answer5) values ('$uid', '$cid', '$win_rate', '$qid1', '$qid2', '$qid3', '$qid4','$qid5','$answer1','$answer2','$answer3','$answer4','$answer5' )";
    $result = mysql_query($sql);
	
	$sql = "SELECT * FROM user_record where uid = $uid ORDER BY num DESC;";
	$result = mysql_query($sql);
	$num_rows = mysql_num_rows($result);
	while (  $row = mysql_fetch_row($result) ) {
	   $user_winRate = $user_winRate + (float)$row[4] ; 
	}
	
	$user_winRate = $user_winRate / $num_rows;
	$sql = "update user_info set exp=$exp, win_Rate=$user_winRate, p_money=$p_money where uid='$uid'";
    $result = mysql_query($sql);

	
  }
  else
    echo 'no' ;

?>