<?php
  require_once('DBconfig.php');
  
  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
    $sql = "SELECT distinct * FROM gashapon WHERE uid = $uid GROUP BY gashaimg;";
    $result = mysql_query($sql);
	$num_rows = mysql_num_rows($result);
	
	$record = array();
	array_push($record , $num_rows );
    for (  $i = 1 ; $row = mysql_fetch_row($result) ;) {
	   array_push($record , (int)$row[1] );    	
	   array_push($record , $row[2] );
	}
	
	
	
	echo json_encode($record);
    
  } // if
  else
    echo 'no' ;
  
?>