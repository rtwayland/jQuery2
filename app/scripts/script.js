$(document).ready(function() {
    var sessionContents = sessionStorage.getItem("tasks");
    if (sessionContents !== null) {
        var listo = JSON.parse(sessionContents);
        placeTasks(listo);
    } else {
        var listo = [];
    }
    $('#newTaskForm').hide();

    function Task(task) {
        this.task = task;
        this.id = 'new';
    }

    function placeTasks(listo) {
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].id === 'new') {
                addNew(listo[i]);
            } else if (listo[i].id === 'inProgress') {
                addProgress(listo[i]);
            } else {
                addArchive(listo[i]);
            }
        }
    }

    function addNew(task) {
        $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>' +
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
        );
    }

    function addProgress(task) {
        $('#currentList').append(
            '<a href="#finish" class="" id="inProgress">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>' +
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
        );
    }

    function addArchive(task) {
        $('#archivedList').append(
            '<a href="#finish" class="" id="archived">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>' +
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-remove">' +
            '</span>' +
            '</li>' +
            '</a>'
        );
    }

    var advanceTask = function(task) {
        var modified = task.innerText.trim()
        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task.toUpperCase() === modified) {
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';
                } else {
                    listo.splice(i, 1);
                }
                break;
            }
        }
        task.remove();
    };

    var addTask = function(task) {
        if (task) {
            task = new Task(task);
            listo.push(task);

            sessionStorage.setItem("tasks", JSON.stringify(listo));

            $('#newItemInput').val('');
            addNew(task);
        }
        $('#newTaskForm').slideToggle('fast', 'linear');
    }

    $('#saveNewItem').on('click', function(e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });

    $('#add-todo').on('click', function() {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function(e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });

    $(document).on('click', '#item', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);

        sessionStorage.setItem("tasks", JSON.stringify(listo));
    });

    $(document).on('click', '#inProgress', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        $('#archivedList').append(changeIcon);

        sessionStorage.setItem("tasks", JSON.stringify(listo));
    });

    $(document).on('click', '#archived', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);

        sessionStorage.setItem("tasks", JSON.stringify(listo));
    });
});
