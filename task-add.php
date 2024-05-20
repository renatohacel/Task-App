<?php
include('database.php');

if(isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];
    $query = "INSERT into tareas(nombre,descripcion) VALUES ('$name','$description')";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Query Failed' . mysqli_error($connection));
    }
    echo 'Tarea añadida correctamente';
}