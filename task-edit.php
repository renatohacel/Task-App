<?php
include('database.php');

if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $id = $_POST['id'];

    $query = "UPDATE tareas SET nombre = '$name', descripcion = '$description' WHERE id = '$id'";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Failed' . mysqli_error($connection));
    }
    echo 'Tarea editara correctamente';
}
