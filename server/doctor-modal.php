<?php
class Doctors{
  //Get users
  function getDoctors()
  {
    global $conn;
    $query="SELECT * FROM `LEA_Doctor`;";
    $response=array();
    $result=mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result))
    {
      $response[]=$row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
  }
  function getDoctor($doctor_id)
  {
    global $conn;
    $query="SELECT * FROM `LEA_Doctor` WHERE DocID = '".$doctor_id."';";
    $response=array();
    $result=mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result))
    {
      $response[]=$row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
  }
  //Save user
  function saveDoctor($data){
    global $conn;
    $test = json_encode($data);
    
     $query = "INSERT INTO `LEA_Doctor` (`DocID`, `Name`, `Title`, `Username`, `Password`, `Status`, `HospID`,`datetime_register`,`role`,`email`) VALUES ('".$data->id."', '".$data->name."', '".$data->title."', '".$data->username."', '".$data->password."', '".$data->status."', '".$data->hospid."', NOW(),'".$data->role."','".$data->email."');";
     echo $result=mysqli_query($conn, $query);
    echo $query;
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Update user
  function updateDoctor($data){
    global $conn;
    $query = "UPDATE `LEA_Doctor` SET `Name` = '".$data->name."' , `Title` = '".$data->title."', `Username`='".$data->username."', `Password` = '".$data->password."', `Status` = '".$data->status."', `HospID` = '".$data->hospid."', `Email` = '".$data->email."',`role` = '".$data->role."'  WHERE `LEA_Doctor`.`DocID`= '".$data->id."'";
    echo $result=mysqli_query($conn, $query);
    echo $query;
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Delete user
  function deleteDoctor($data){
    global $conn;
    $query = "DELETE FROM LEA_Doctor WHERE DocID ='".$data->DocID."'";;
    if($result=mysqli_query($conn, $query)){
      echo "success";
    }else{
      echo "error";
      echo $query;
    };
    
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  
  //Login doctor
  function login($data){
    global $conn;
    
    $query = "SELECT DocID, role FROM `LEA_Doctor` WHERE Username = '".$data->username."' AND Password = '".$data->password."'";
    
    $response=array();
    $result=mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result))
    {
      $response[]=$row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
  }
}

?>