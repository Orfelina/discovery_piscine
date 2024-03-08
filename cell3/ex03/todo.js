window.onload = function() {
    loadTasks();
};

function loadTasks() {
    var tasks = getCookies();
    var ft_list = document.getElementById('ft_list');
    ft_list.innerHTML = '';

    if (tasks) {
        tasks.reverse().forEach(function(task) {
            createTaskElement(task);
        });
    }
}

function getCookies() {
    var cookies = document.cookie.split(';');
    var tasks = [];

    cookies.forEach(function(cookie) {
        var cookiePair = cookie.trim().split('=');
        if (cookiePair[0] === 'tasks') {
            tasks = JSON.parse(cookiePair[1]);
        }
    });

    return tasks;
}

function setCookie(tasks) {
    document.cookie = 'tasks=' + JSON.stringify(tasks);
}

function createTaskElement(taskText) {
    var taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerText = taskText;
    taskElement.onclick = function() {
        if (confirm('¿Eliminar esta tarea?')) {
            this.remove();
            updateCookies();
        }
    };
    document.getElementById('ft_list').prepend(taskElement);
}

function addTask() {
    var taskText = prompt('Ingrese una nueva tarea:');
    if (taskText) {
        createTaskElement(taskText);
        updateCookies();
    }
}

function updateCookies() {
    var tasks = [];
    var taskElements = document.querySelectorAll('.task');
    taskElements.forEach(function(taskElement) {
        tasks.push(taskElement.innerText);
    });
    setCookie(tasks);
}