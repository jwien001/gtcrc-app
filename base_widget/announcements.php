<?php

    // Include DB helper file for connecting to database
    include 'db_helper.php';

    // Return number of VALID announcements
    function getNumberOfAnnouncements()
    {
        $dbQuery = sprintf("SELECT * FROM CRC_Announcements_Info WHERE StartDate <= CURDATE() AND EndDate >= CURDATE()");
        $result = mysql_num_rows(getDBResultsArray($dbQuery));
        header("Content-type: application/json");
        echo json_encode($result);
    }

    // Return announcements based on GET flag
    function getAnnouncements($all)
    { 
        if($all === TRUE) // Since we're dealing with boolean checks, use === instead of ==
        {
            // Request for ALL announcements
            $dbQuery = sprintf("SELECT * FROM CRC_Announcements_Info ORDER BY StartDate");
        }
        else
        {
            // Request for VALID announcements based on date
            $dbQuery = sprintf("SELECT * FROM CRC_Announcements_Info WHERE StartDate <= CURDATE() AND EndDate >= CURDATE() ORDER BY StartDate");
        }
        $result = getDBResultsArray($dbQuery);
        
        // Return data payload as JSON
        header("Content-type: application/json");
        echo json_encode($result);
    }

?>
