<?php
  require_once('DBconfig.php');
  
  	if ( isset($_POST['uid']) ) { 
		$sql ="SELECT * FROM `poem` ORDER BY RAND()  LIMIT 1" ;
		$result = mysql_query($sql);
	    while (  $row = mysql_fetch_assoc($result) ) {
	       $poems = array(
	       	 "pid"    =>  $row['pid'],
		     "poem_title"   =>  $row['poem_title'],
			 "poem_content"   =>  $row['poem_content'],
		     "poem_detail"   =>  $row['poem_detail'],
		     "poem_good"  =>  $row['poem_good']
		   );    
		}
	
		$data_array = array (
		  "poems_array"     => $poems
		);
	
		// print_r( $data_array);
		echo json_encode($data_array);
    
	} // if
  
  	else
    echo 'no' ;
  
?>