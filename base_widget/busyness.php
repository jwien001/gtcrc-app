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

        //Get hourly busyness data on particular date
        //The date must be string in format MMDDYYYY
        function getHourlyBusynessOnDate($date) {

                $dbQuery = sprintf("SELECT dttm,count FROM CRC_Turnstile_Info WHERE dttm like '..%s' order by dttm",
                        mysql_real_escape_string($date));
                $result = getDBResultsArray($dbQuery);
                header("Content-type: application/json");
                echo json_encode($result);
        }

?>
