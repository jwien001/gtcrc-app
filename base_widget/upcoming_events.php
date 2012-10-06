<?php

   include 'db_helper.php';

   //This function will return the next 'N' upcoming events
   function getNextNUpcomingEvents($N) {
   
      $today_date=date("Y-m-d");
      $dbQuery = sprintf("SELECT * FROM CRC_UpcomingEvents_Info WHERE Date >= '%s' ORDER BY Date LIMIT %d",
                        mysql_real_escape_string($date), $N);
      $result = getDBResultsArray($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }

   //Get all the upcoming events from today onwards.
   function getAllUpcomingEvents() {
      
      //Get todays date in 'yyyy-mm-dd' format
      $today_date=date("Y-m-d");
      $dbQuery = sprintf("SELECT * FROM CRC_UpcomingEvents_Info WHERE Date >= '%s' ORDER BY Date",
                        mysql_real_escape_string($date));
      $result = getDBResultsArray($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }
?>
