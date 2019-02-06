<?php
  require_once('DBconfig.php');
  
  	if ( isset($_POST['uid']) ) { 
		$sql ="SELECT * FROM `gashaimg` ORDER BY RAND()  LIMIT 1" ;
		$result = mysql_query($sql);
	    while (  $row = mysql_fetch_assoc($result) ) {
	       $gashas = array(
	       	 "num"    =>  $row['num'],
		     "Gimg"  =>  $row['Gimg']
		   );    
		}
	
		$data_array = array (
		  "gashas_array"     => $gashas
		);
	
		// print_r( $data_array);
		echo json_encode($data_array);
    
	} // if
  
  	else
    echo 'no' ;
  
?>