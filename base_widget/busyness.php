<?php
	
	include 'db_helper.php';
	
  //This function will provide current busyness
  //for displaying on homwscreen.
	function getCurrentBusyness() {
		
		//Get current tims in HHMMDDYYYY format
		$current_timestamp=date("HmdY");
		$dbQuery = sprintf("SELECT count FROM CRC_Turnstile_Info WHERE dttm = '%s'",
			mysql_real_escape_string($current_timestamp));
		$result=getDBResultRecord($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}

?>
