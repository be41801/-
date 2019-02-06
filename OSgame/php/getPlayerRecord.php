<?php
  require_once('DBconfig.php');
  
  if ( isset($_POST['uid']) ) {
    $uid = $_POST['uid'] ;
    $sql = "SELECT * FROM user_record WHERE uid = $uid ORDER BY num DESC LIMIT 4;";
    $result = mysql_query($sql)or die("Error "."<br/><br/>".mysql_error());
	$num = mysql_num_rows($result);
	//$row = mysql_fetch_assoc($result);
	if ( empty( $num ) ) {
	  $data_array = array (
		  "haveRecord"   =>  "no"
	    );	  
	  //print_r( $data_array);
	  echo json_encode($data_array);
	} // if
    
	else {
	  $i = 0;
	  $ques = array();
	  $temp = array();

      	while (   $row = mysql_fetch_assoc($result) ) {
	        $temp[$i] = $row['qid1'];
		    $i++;
		    $temp[$i] = substr($row['answer1'], -1);
		    $i++;
		    $temp[$i] = $row['qid2'];
		    $i++;
		    $temp[$i] = substr($row['answer2'], -1);
		    $i++;
		    $temp[$i] = $row['qid3'];
		    $i++;
		    $temp[$i] = substr($row['answer3'], -1);
		    $i++;
		    $temp[$i] = $row['qid4'];
		    $i++;
		    $temp[$i] = substr($row['answer4'], -1);
		    $i++;
		    $temp[$i] = $row['qid5'];
		    $i++;
		    $temp[$i] = substr($row['answer5'], -1);
		    $i++;
	    }//while
		$j = 0;
		$num = 0;
		$sql ="SELECT * FROM `user_info` where uid =  '$uid';" ;
		$result = mysql_query($sql);
		$row = mysql_fetch_row($result) ;
		if($row[10] == 0) {
			while ( $j < $i ) {
			    $sql = "SELECT * FROM `ques_os` where qid = $temp[$j]";
			  	$result = mysql_query($sql);
			    if ( $result ) $row = mysql_fetch_assoc($result);
			  	$ques_temp = array(
			  	     "qid"   =>  $row[ 'qid'],
			         "ans1"   =>  $row['ans1'],
			         "ans2"   =>  $row['ans2'],
			         "ans3"   =>  $row['ans3'],
			         "ans4"   =>  $row['ans4'],
			    	 "correct"   =>  $row['correct'],
			  	     "answer" =>  $temp[$j+1],
					 "whyans"   =>  $row['whyans']
			       );  
			  	array_push($ques , $ques_temp );
			  	$j = $j + 2;
			  	$num++;
			} // while
		}//if
		else{
			while ( $j < $i ) {
			    $sql = "SELECT * FROM `ques_os2` where qid = $temp[$j]";
			  	$result = mysql_query($sql);
			    if ( $result ) $row = mysql_fetch_assoc($result);
			  	$ques_temp = array(
			  	     "qid"   =>  $row[ 'qid'],
			         "ans1"   =>  $row['ans1'],
			         "ans1_Img" =>  $row['ans1_Img'],
			         "ans2"   =>  $row['ans2'],
			         "ans3"   =>  $row['ans3'],
			         "ans4"   =>  $row['ans4'],
			    	 "correct"   =>  $row['correct'],
			  	     "answer" =>  $temp[$j+1],
					 "whyans"   =>  $row['whyans']
			       );  
			  	array_push($ques , $ques_temp );
			  	$j = $j + 2;
			  	$num++;
			} // while			
		}

	  
	  $data_array = array (
	      "num"=> $num,
		  "haveRecord"   =>  "yes",
	      "record_array"  => $ques
	    );
	  
	  //print_r( $data_array);
	  echo json_encode($data_array);
	
	} // else
  } // if
  else
    echo 'no' ;
  
?>