$(function () {
    console.log('jquery');
    $('#task-result').hide();
    fetchTask();
    let edit = false;

    //SEARCH
    $('#search').keyup(function (e) {
        if ($('#search').val()) {

            let search = $('#search').val();
            $.ajax({
                url: "task-search.php",
                type: "POST",
                data: {
                    search
                },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                            ${task.nombre}
                        </li>`;

                        $('#container').html(template);
                        $('#task-result').show();
                    });

                }
            });

        } else {
            $('#task-result').hide();
        }
    });

    //ADD
    $('#task-form').submit(function (e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#task-id').val()
        };
        let url = edit === false ? 'task-add.php' : 'task-edit.php';
        $.post(url, postData, function (response) {
            fetchTask();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
    });

    //LISTAR
    function fetchTask() {
        $.ajax({
            url: "task-list.php",
            type: "get",
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template +=
                        `<tr task-id="${task.id}">
                        <td>${task.id}</td>
                        <td>
                            <a class="task-item">${task.nombre}</a>
                        </td>
                        <td>${task.descripcion}</td>
                        <td>
                            <button class="task-delete btn btn-outline-danger">Borrar</button>
                        </td>
                    </tr>`
                });
                $('#tasks').html(template);
            }
        });
    }
    //BORRAR
    $(document).on('click', '.task-delete', function () {
        if (confirm('¿Estás seguro de que quieres borrar la tarea?')) {
            element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('task-id');
            $.post('task-delete.php', { id }, function (response) {
                console.log(response);
                fetchTask();
            })
            console.log(id);
        }
    });
    //EDITAR
    $(document).on('click', '.task-item', function () {
        edit = true;
        element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('task-id');
        $.post('task-single.php', { id }, function (response) {
            let task = JSON.parse(response);
            $('#name').val(task.nombre);
            $('#description').val(task.descripcion);
            $('#task-id').val(task.id);
            fetchTask();
        })
    });
});