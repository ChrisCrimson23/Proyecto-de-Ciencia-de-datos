const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = async event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (!value) return;

    // Crear tarea en la base de datos
    try {
        const response = await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskText: value })
        });
        if (!response.ok) throw new Error('Error al agregar la tarea');
        const newTask = await response.json();

        // Crear el elemento de tarea en el DOM
        const task = document.createElement('div');
        task.classList.add('task', 'roundBorder');
        task.addEventListener('click', changeTaskState)
        task.textContent = newTask.taskText;
        tasksContainer.prepend(task);

        event.target.reset();
    } catch (error) {
        console.error(error);
    }
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    return [...toDo, ...done];
};

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el));
};

setDate();

$(document).ready(function() {
    $('.task').click(function() {
        $(this).toggleClass('done');
    });

    $('.delete-button').click(function() {
        $(this).parent().remove();
    });
});