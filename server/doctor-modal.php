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
  //Save user
  function saveDoctor($data){
    global $conn;
    $query = "INSERT INTO `LEA_Doctor` (`DocID`, `Name`, `Title`, `Username`, `Password`, `Status`, `HospID`) VALUES ('".$data->DocID."', '".$data->Name."', '".$data->Title."', '".$data->Username."', '".$data->Password."', '".$data->Status."', '".$data->HospID."');";
    echo $result=mysqli_query($conn, $query);
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Update user
  function updateDoctor($data){
    global $conn;
    $query = "UPDATE LEA_Doctor SET `Name` = '".$data->Name."' , `Title` = '".$data->Title."', `Username`='".$data->Username."', `Password` = '".$data->Password."', `Status` = '".$data->Status."', `HospID` = '".$data->HospID."' WHERE `DocID`= '".$data->DocID."'";
    echo $result=mysqli_query($conn, $query);
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Delete user
  function deleteDoctor($data){
    global $conn;
    $query = "DELETE FROM LEA_Doctor WHERE DocID =".$data->id;
    echo $result=mysqli_query($conn, $query);
    header('Content-Type: application/json');
    //Respond success / error messages
  }
}

?>