<?php

   include 'db_helper.php';

   //This function will return all the building hours info on a given date
   //The date must be in 'yyyy-mm-dd' format
   function getBuildingHoursByDate($date) {
   
      
      $dbQuery = sprintf("SELECT * FROM CRC_BuildingHours_Info WHERE Date = '%s'",
                        mysql_real_escape_string($date));
      $result = getDBResultsArray($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }

   //Get the information about all the building hours today and in the future.
   function getAllBuildingHoursInfo() {
      
      //Get todays date in 'yyyy-mm-dd' format
      $today_date=date("Y-m-d");
      $dbQuery = sprintf("SELECT * FROM CRC_BuildingHours_Info WHERE Date >= '%s'",
                        mysql_real_escape_string($today_date));
      $result = getDBResultsArray($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }
?>
