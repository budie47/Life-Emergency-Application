<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    //If required
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");         
 
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
    exit(0);
}
// Connect to database
$conn = mysqli_connect('localhost','dev','P@ssw0rd111','life_emergency_application');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

 include_once('hospital-modal.php');
$request_method = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"));
$hospital = new Hospital;
switch($request_method)
{
  case 'GET':
    // Retrive Users
    if(!empty($_GET["user_id"]))
    {
      $user_id=intval($_GET["user_id"]);
      $hospital->gethospitals($user_id);
    }
    else
    {
      $hospital->gethospital();
    }
    break;
  case 'POST':
    // Insert User

    if($data->method == "insert"){
      $hospital->saveHospital($data);
    }elseif($data->method == "update"){
      $hospital->updateHospital($data);
    }elseif($data->method =="delete"){
      $hospital->deleteHospital($data);
    }
    break;
  case 'PUT':
    $hospital->updatehospital($data);
    break;
  case 'DELETE':
    // Delete User
    $hospital->deletehospital($data);
    break;
  default:
    // Invalid Request Method
    header("HTTP/1.0 405 Method Not Allowed");
    break;
}

?>
