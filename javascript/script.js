var createTaskForm = document.querySelector('#create-task-form');
var taskList       = document.querySelector('#task-list');

createTaskForm.addEventListener('submit', function(event) {
	event.preventDefault();
	var title = this.title.value;
  	if (title.length > 0) {
  		createTask(title);
  		createTaskForm.reset();
  	}
});

function createTask(title) {
	var div = document.createElement('div');
	div.innerHTML = title + ' <i class="fa fa-check-circle" onclick="toggleStatus(this);"></i>';
	div.className = 'task';

	taskList.appendChild(div);
};

function toggleStatus(element) {
	var taskElement = element.parentElement;

	if (taskElement.className.search('todo') > -1) {
		taskElement.className = taskElement.className.replace('todo', 'done');
	} else {
		taskElement.className = taskElement.className.replace('done', 'todo');
	}
};

function filter(filter, button) {
	button.className = 'active';
	
	var previousFilter = document.querySelector('.task-filters button.active');
	previousFilter.className = '';

	var tasks = document.querySelectorAll('.task');
	
	for (var i = 0; i < tasks.length; i++) {
		var task = tasks[i];
		switch (filter) {
			case 'all':
				task.style.display = 'block';
			break;

			case 'todo':
				task.style.display = task.className.search('todo') > -1 ? 'block' : 'none';
			break;

			case 'done':
				task.style.display = task.className.search('done') > -1 ? 'block' : 'none';
			break; 
		}
	}
};

function performanceCheck() {
	var start = new Date().getTime();
	for(var i = 0; i <= 10000; i++) {
		createTask('Task n° ' + i);
	}
	var end = new Date().getTime();
	var time = end - start;
	console.log('Execution time: ' + time + 'ms');
}