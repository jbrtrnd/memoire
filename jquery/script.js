$(function() {
	var $createTaskForm = $('#create-task-form');
	var $taskList       = $('#task-list');

	$createTaskForm.on('submit', function (event) {
		event.preventDefault();

		var title = this.title.value;
	  	if (title.length > 0) {
	  		createTask(title);
	  		$createTaskForm[0].reset();
	  	}
	});

	function createTask(title) {
		var $task = $('<div class="task todo">' + title + '<i class="fa fa-check-circle"></i></div>');
	  		$task.find('i').on('click', function (event) {
  				if ($task.hasClass('todo')) {
					$task.removeClass('todo')
					     .addClass('done');
  				} else {
  					$task.removeClass('done')
					     .addClass('todo');
  				}
	  		});
	  		$taskList.prepend($task);
	};

	$('#filter-all').on('click', function () {
		$('.task').show();
	});

	$('#filter-done').on('click', function () {
		$('.task.done').show();
		$('.task.todo').hide();
	});

	$('#filter-todo').on('click', function () {
		$('.task.todo').show();
		$('.task.done').hide();
	});


	$('#performance').on('click', function() {
		var start = new Date().getTime();
		for(var i = 0; i <= 10000; i++) {
			createTask('Task n° ' + i);
		}
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + time + 'ms');
	});
});