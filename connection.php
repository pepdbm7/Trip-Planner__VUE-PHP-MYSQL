<?php
class DataBase {
    private $host ="localhost";
    private $user ="root";
    private $pass = "";
    private $db = "trip_planner";
    public $connection;

    public function __construct() {
        $this->connection = new mysqli($this->host, $this->user, $this->pass, $this->db) or die(mysql_error());
        $this->connection->set_charset("utf8");
    }

    //Create:
    public function create($table, $data) {
        $result = $this->connection->query("INSERT INTO $table VALUES (null.$data") or die($this->connection->error);
        if($result) {
            return true;
        }
        return false;
    }

    //delete:
    public function delete($table, $condition) {
        $result = $this->connection->query("DELETE FROM $table WHERE $condition") or die($this->connection->error);
        if($result) return true;
        return false;
    }

    //update:
    public function update($table, $fields, $condition) {
        $result = $this->connection->query("UPDATE $table SET $fields WHERE $condition") or die($this->connection->error);
        if($result) return true;
        return false;
    }

    //retrieve:
    public function retrieve($table, $condition) {
        $result = $this->connection->query("SELECT * FROM $table WHERE $condition") or die($this->connection->error);
        if($result) return $result->fetch_all(MYSQLI_ASSOC); //it returns all rows of an array at once, not like mysqli_fetch_array()
        return false;
    }

}

?>