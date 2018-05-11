<?php
class Hospital{
  //Get users
  function getHospital()
  {
    global $conn;
    $query="SELECT * FROM `LEA_Hospital`;";
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
  function saveHospital($data){
    global $conn;
    $query = "INSERT INTO `LEA_Hospital` (`id`, `name`, `address`, `district`, `state`, `postcode`) VALUES ('".$data->id."', '".$data->name."', '".$data->address."', '".$data->district."', '".$data->state."', '".$data->postcode."');;";
    if($result=mysqli_query($conn, $query)){
      echo "success";
    }else{
      echo "error";
      //echo $query;
    }
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Update user
  function updateHospital($data){
    global $conn;
    $query = "UPDATE `LEA_Hospital` SET `name` = '".$data->name."' , `address` = '".$data->address."', `district`='".$data->district."', `state` = '".$data->state."', `postcode` = '".$data->postcode."' WHERE `id`= '".$data->id."'";
    if($result=mysqli_query($conn, $query)){
      echo "success Update";
    }else{
      echo "error";
      echo $query;
    }
    header('Content-Type: application/json');
    //Respond success / error messages
  }
  //Delete user
  function deleteHospital($data){
    global $conn;
    $query = "DELETE FROM LEA_Hospital WHERE id ='".$data->id."'";
    if($result=mysqli_query($conn, $query)){
      echo "success";
    }else{
      echo "error";
      echo $query;
    };
    header('Content-Type: application/json');
    //Respond success / error messages
  }
}

?>