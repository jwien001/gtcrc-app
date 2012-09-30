<?

/*
 * GTCRC MAS Project, Announement System
 * This file is responsible for all interactions with the MySQL database and other data-related grunt work.
 * All calls to the DB should be obfuscated in here. This allows for neat PHP templating in our HTML view code.
 *
 */


// Start session
session_start();


/* -- Configuration Data START -- For production, these could be in an .ini file -- */
// MySQL Connection Parameters
const DB_HOSTNAME = 'localhost';
const DB_USERNAME = 'TODO';
const DB_PASSWORD = 'TODO';
const DB_DBNAME = 'TODO_announcements';

// Frequently Accessed Table Names
const DB_TABLE_ANNOUNCE = 'announcments';
const DB_TABLE_USERS = 'users';

// Salt used for hashing passwords, *DO NOT* change this after going live
const PASSWORD_SALT = 'Alol2448catZ';

// How many announcements do we want to fetch?
const ANNOUNCE_FETCH_LATEST = 0;
const ANNOUNCE_FETCH_ALL = 1;
const ANNOUNCE_FETCH_DETAIL = 2;
/* -- Configuration Data END -- */


/*
 * Our main announcements management class
 * All access to MySQL databases must remain encapsulated inside this class
 *
 */
class AnnounceDataManager
{
    
    /* -- @Citation START -- (snippet taken from http://www.php.net/manual/en/function.session-start.php#102460) */
    
    // THE only instance of this class
    private static $instance = NULL;
    
    // Returns THE instance of this class
    public static function getInstance()
    {
        if(is_null(self::$instance))
            self::$instance = new self;
        return self::$instance;
    }

    /* -- @Citation END -- */    
    
    // Connect to database
    private function _dbConnect()
    { /* Private: Doesn't need to be called outside of data management functions */
        if (($connection = mysql_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD)) === FALSE)
            die('Error: Could not connect to database.');

        // Placeholder for transaction start (locking unnecesssary for this application)
    }
    
    // Close connection to database
    private function _dbClose()
    { /* Private: Doesn't need to be called outside of data management functions */
        // Placeholder for transaction commit (locking unnecessary for this application)
        
        mysql_close();
    }
    
    // Hash the password with set salt
    public function hashpassword($password)
    {
        return md5($password . PASSWORD_SALT);
    }

    // Is the user logged in? Used to display different kinds of markup dynamically depending on session state
    public function isLoggedIn()
    {
        if(isset($_SESSION['authenticated']) && $_SESSION['authenticated'])
            return TRUE;
        else
            return FALSE;
    }
    
    // Log the user in, save session
    public function logIn($userid, $password)
    {
        // Connect to DB
        $this->_dbConnect();

        // Select DB
        if (mysql_select_db(DB_DBNAME) === FALSE)
            die('Error: Could not select database.');

        // Hash password before using it
        $hashedPassword = $this->hashPassword($password);

        // Create query string
        $query = 'TODO';

        // Execute query
        $result = mysql_query($query);
        if ($result === FALSE)
            die('Error: Could not query database.');
        $row = mysql_fetch_row($result);

        // Check whether we found a row
        if (mysql_num_rows($result) == 1)
        {
            // Remember that the user's logged in
            $_SESSION['authenticated'] = TRUE;
            // Store some "safe" data in session to be used in markup
            $_SESSION['username'] = $row[0];
            // Disconnect from DB
            $this->_dbClose();
            return TRUE;
        }
        else
        {
            // Disconnect from DB
            $this->_dbClose();
            return FALSE;
        }
    }

    // Log the user out, clear session
    public function logOut()
    {
        session_destroy();
    }

    // Add new user (Register)
    public function addUser($username, $password)
    {
        // Do we need this? Need to outside user authentication
        // to GTID/Buzzcard login. Leaving this as placeholder for now.
    }

    // Fetch announcements
    public function getAnnouncements($fetchMode)
    {
        // Connect to DB
        $this->_dbConnect();

        // Select Database
        if (mysql_select_db(DB_DBNAME) === FALSE)
            die('Error: Could not select database.');

        switch ($fetchMode)
        {
        case FETCH_ANNOUNCE_LATEST:
            // TODO: query valid and latest announcements only
            break;
        case FETCH_ANNOUNCE_ALL:
            // TODO: query all valid announcements
            break;
        case FETCH_ANNOUNCE_DETAIL:
            // TODO
            break;
        }

        // Declare associative array for storing announcement data
        $announcementData = array()

        // Populate associative array as title => description
        while($row = mysql_fetch_row($result))
            $portfolioData[$row[0]] = $row[1];

        // Disconnect from DB
        $this->_dbClose();

        // Return populated associative array
        return $announcementData;
    }


}

