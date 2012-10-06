<?php

   include 'db_helper.php';

   //This function will provide current busyness
   //for displaying on homwscreen.
   function getCurrentBusyness() {
   
      //Get current tims in HHMMDDYYYY format
      $current_timestamp=date("HmdY");
      $dbQuery = sprintf("SELECT count FROM CRC_Turnstile_Info WHERE dttm = '%s'",
                        mysql_real_escape_string($current_timestamp));
      $result=getDBResultRecordOrNull($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }

   //Get average hourly busyness data on particular day
   //Average is calculated based on the data from previous 2 weeks.
   //The day must be integer from 1-7 (Monday-Sunday ISO-8601 representation)
   function getAvgHourlyBusynessOnDay($day) {
      
      $curr_date = new DateTime();
      $today = $curr_date->format('w');
      if($day < $today) {
         $diff1 = $today-$day;
      }
      else {
         $diff1 = 7-$day+$today;
      }
      
      $curr_date->modify("-$diff1 day");
      $first_date=$curr_date->format('mdY');
      $curr_date->modify('-7 day');
      $second_date=$curr_date->format('mdY');
      
      $hours=array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23');
      $result=array();
      foreach($hours as $hour) {
         $dbQuery = sprintf("SELECT AVG(count) FROM CRC_Turnstile_Info WHERE dttm like '%s' OR dttm like '%s'",
                        mysql_real_escape_string($hour . $first_date), mysql_real_escape_string($hour . $second_date));
         $result = array_merge($result,getDBResultsArrayOrNull($dbQuery));
      }
      
      header("Content-type: application/json");
      echo json_encode($result);
   }
?>
