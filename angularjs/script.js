(function() {
	var app = angular.module('todo', []);

	app.factory('Task', function () {
		var Task = function (title) {
			this.title  = title;
			this.status = 'todo';

			this.toggleStatus = function () {
				if (this.status == 'todo') {
					this.status = 'done';
				} else {
					this.status = 'todo';
				}
			};	
		};

		return Task;
	})

	app.controller('taskController', [
		'Task', '$timeout',
		function (Task, $timeout) {
			var self = this;

			self.filter = '';
			self.tasks  = [];

			self.resetTask = function () {
				self.task = new Task();
			};

			self.createTask = function () {
				self.tasks.push(self.task);
				self.resetTask();
			};

			self.performanceCheck = function () {
				var start = new Date().getTime();
				for(var i = 0; i <= 10000; i++) {
					self.task.title = 'Task ' + i;
					self.createTask();
				}
				
				$timeout(function () {
					var end = new Date().getTime();
					var time = end - start;
					console.log('Execution time: ' + time + 'ms');
				});
			};

			self.resetTask();
		}	
	]);
})();