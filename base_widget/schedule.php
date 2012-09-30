<?php

   include 'db_helper.php';

   //This function will return all the info about a particular class
   function getClassInfoByName($className) {
   
      $dbQuery = sprintf("SELECT * FROM CRC_Schedule_Info WHERE ClassName = '%s'",
                        mysql_real_escape_string($className));
      $result=getDBResultRecord($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }

   //Get the information about all the classes
   function getAllClassInfo() {
      
      $dbQuery = "SELECT * FROM CRC_Schedule_Info";
      $result = getDBResultsArray($dbQuery);
      header("Content-type: application/json");
      echo json_encode($result);
   }
?>
