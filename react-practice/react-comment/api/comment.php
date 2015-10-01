<?php
include_once('config.php');

$mysqli = @new mysqli();
$mysqli->connect($DB_SERVER, $DB_USER, $DB_PASS, $DB_NAME);

if($mysqli->connect_errno){
  die('Connect Error:'.$mysqli->connect_error);
}
$mysqli->set_charset('utf8');

function dataFilter($str){
	return addslashes(htmlspecialchars(trim($str), ENT_COMPAT ,'UTF-8'));
}

if(isset($_GET['action'])) $action = intval($_GET['action']);
if(isset($action) && ($action == 1)){
  $sql = "SELECT * FROM comment";
  $mysqli_result = $mysqli->query($sql);
  if($mysqli_result && $mysqli_result->num_rows > 0){
    $result = array();
    $i = 0;
    while($row = $mysqli_result->fetch_array(MYSQL_ASSOC)){
      $result[$i]['author'] = $row['name'];
      $result[$i]['text'] = $row['text'];
      $i++;
    }
    $mysqli_result->free();
  }
  echo json_encode($result);
}

if(isset($action) && ($action == 2) ){
  $name = dataFilter($_POST['name']);
  $text = dataFilter($_POST['text']);
  $time = time();
  $sql = "INSERT INTO comment(name, text, time) VALUES('$name', '$text', $time)";
  $res = $mysqli->query($sql);
}
?>
