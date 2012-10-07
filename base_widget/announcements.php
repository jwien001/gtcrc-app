<?php

    // Include DB helper file for connecting to database
    include 'db_helper.php';

    // Return VALID announcements
    function getValidAnnouncements()
    {
        $dbQuery = sprintf("SELECT * FROM `CRC_Announcements_Info` WHERE StartDate <= CURDATE() && EndDate >= CURDATE() ORDER BY StartDate");
        $result = getDBResultsArray($dbQuery);
        header("Content-type: application/json");
        echo json_encode($result);
    }

    // Return ALL announcements
    function getAllAnnouncements()
    { 
        $dbQuery = sprintf("SELECT * FROM `CRC_Announcements_Info` ORDER BY StartDate");
        $result = getDBResultsArray($dbQuery);
        header("Content-type: application/json");
        echo json_encode($result);
    }

    // Return number of VALID announcements
    function getNumberOfAnnouncements()
    {
        $dbQuery = sprintf("SELECT * FROM `CRC_Announcements_Info` WHERE StartDate <= CURDATE() && EndDate >= CURDATE()");
        $result = getDBResultsArray($dbQuery);
        $num_announcements = mysql_num_rows($result);       
        echo $num_announcements;
    }

?>
