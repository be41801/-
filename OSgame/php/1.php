<?php

require_once('DBconfig.php');

	$sql = "SELECT * FROM user_record ;";
	$result = mysql_query($sql);
	$i = 1;
	while (  $row = mysql_fetch_assoc($result) ) {
	   $sql = "update user_record set num='$i' where num = '$row[num]' ";
       $result2 = mysql_query($sql);
	   $i = $i + 1;
	}
	

?>