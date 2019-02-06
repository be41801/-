<?php
  require_once('DBconfig.php');
  
  if ( isset($_POST['uid']) ) {
	$uid = $_POST['uid'] ;
	$chapter = $_POST['chapter'] ;
	$num_ques = 5 ;
  
	$sql ="SELECT * FROM `user_info` where uid =  '$uid';" ;
	$result = mysql_query($sql);
	$row = mysql_fetch_row($result) ;
	$user_name = $row[1];
	$user_img = $row[9];
	if($row[10] == 0) {
 		$sql ="SELECT * FROM `ques_os` where chapter IN ( $chapter ) ORDER BY RAND()  LIMIT $num_ques" ;
		$result = mysql_query($sql);
		$ques = array();
	    while (  $row = mysql_fetch_assoc($result) ) {
	       $ques_temp = array(
	       	 "qid"    =>  $row[ 'qid'],
		     "title"   =>  $row[ 'title'],
			 "title_img"   =>  $row['title_Img'],
		     "ans1"   =>  $row['ans1'],
			 "ans1_img"   =>  $row['ans1_Img'],
		     "ans2"   =>  $row['ans2'],
			 "ans2_img"   =>  $row['ans2_Img'],
		     "ans3"   =>  $row['ans3'],
			 "ans3_img"   =>  $row['ans3_Img'],
		     "ans4"   =>  $row['ans4'],
			 "ans4_img"   =>  $row['ans4_Img'],
			 "whyans" =>  $row['whyans'],
			 "correct"   =>  $row['correct']
		   );    
	   	   array_push($ques , $ques_temp );
		}
	} 
	else{
		$sql ="SELECT * FROM `ques_os2` where chapter IN ( $chapter ) ORDER BY RAND()  LIMIT $num_ques" ;
		$result = mysql_query($sql);
		$ques = array();
	    while (  $row = mysql_fetch_assoc($result) ) {
	       $ques_temp = array(
	       	 "qid"    =>  $row[ 'qid'],
		     "title"   =>  $row[ 'title'],
			 "title_img"   =>  $row['title_Img'],
		     "ans1"   =>  $row['ans1'],
			 "ans1_img"   =>  $row['ans1_Img'],
		     "ans2"   =>  $row['ans2'],
			 "ans2_img"   =>  $row['ans2_Img'],
		     "ans3"   =>  $row['ans3'],
			 "ans3_img"   =>  $row['ans3_Img'],
		     "ans4"   =>  $row['ans4'],
			 "ans4_img"   =>  $row['ans4_Img'],
			 "whyans" =>  $row['whyans'],
			 "correct"   =>  $row['correct']
		   );    
	   	   array_push($ques , $ques_temp );
		}
	}
	
	$data_array = array (
	  "user_img"      => $user_img,
	  "user_name"      => $user_name,
	  "ques_array"     => $ques
	);
	
	// print_r( $data_array);
	echo json_encode($data_array);
    
} // if
  
  else
    echo 'no' ;
  
?>