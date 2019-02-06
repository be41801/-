<?php
  require_once('DBconfig.php');
  
  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
    $sql = "SELECT * FROM user_info WHERE uid = $uid ;";
    $result = mysql_query($sql);
    $row = mysql_fetch_row($result) ;

	$data_array = array (
	  "acct"      => $row[1],
	  "name"      => $row[3],
	  "email"     => $row[4],
	  "money"     => $row[5],
	  "lastlogin" => $row[6],
	  "exp" => $row[7],
	  "win_Rate" => $row[8],
	  "img" => $row[9],
	  "grou" =>  $row[10],
	  "p_money" => $row[11]
	);
	
	echo json_encode($data_array);
    
  } // if
  else
    echo 'no' ;
  
?>