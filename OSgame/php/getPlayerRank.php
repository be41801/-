<?php
    require_once('DBconfig.php');
    if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;	
    $grou = $_POST['grou'] ;
    $sql = "SELECT * FROM user_info WHERE grou = $grou  ORDER BY exp/20*win_Rate/40 DESC;";
    $result = mysql_query($sql);
	$num_rows = mysql_num_rows($result);
	
	$user_rank = array();



	array_push($user_rank , $num_rows );
    while (  $row = mysql_fetch_row($result) ) {
    	  $level = 1;
    	  $row7 = $row[7];
    	  while (  $row[7] >= $level * 50 ) {
      $row[7] =  $row[7] - $level * 50;
	 $level++;
  } // while 	 
	  array_push($user_rank , $row[9] );
	   array_push($user_rank , $row[1] );
	   array_push($user_rank , (int)($row[8]/20*$row7/40));
	   array_push($user_rank , $level );
	   array_push($user_rank , $row[8] );	   	   
	}
	
	echo json_encode($user_rank);
  } // if
  else
    echo 'no' ;    
  
?>