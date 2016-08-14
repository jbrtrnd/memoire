var Task = Backbone.Model.extend({
	defaults: function() {
  		return {
    		title: '',
        	status: 'todo'
      	};
    },
	toggleStatus: function () {
		var status = 'todo';
		if (this.get('status') == 'todo') {
			status = 'done';
		} 

		this.set({'status': status})
	}
});

var TaskCollection = Backbone.Collection.extend({
	model: Task,
	all: function() {
		return this.where();
	},
	todo: function() {
		return this.where({status: 'todo'});
	},
	done: function() {
		return this.where({status: 'done'});
	}
});
var Tasks = new TaskCollection();


var TaskView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#task-template').html()),
	events: {
      'click i': 'toggleStatus'
    },
    initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},
	render: function() {
		this.$el.addClass('task');
		this.$el.toggleClass('todo', this.model.get('status') == 'todo');
		this.$el.toggleClass('done', this.model.get('status') == 'done');
      	this.$el.html(this.template(this.model.toJSON()));
      	return this;
    },
    toggleStatus: function () {
		this.model.toggleStatus();
	},
	toggleVisible: function (e) {
		var toggle = false;
		if (e === 'done' && this.model.get('status') == 'done') {
			toggle = true;
		} else if(e === 'todo' && this.model.get('status') == 'todo') {
			toggle = true;
		} else if (e === 'all') {
			toggle = true;
		}
		this.$el.toggle(toggle);
	},
});

var ContainerView = Backbone.View.extend({
	el: $('body'),
	events: {
      'submit #create-task-form':  'createTask',
      'click #filter-all': 'filterAll',
      'click #filter-done': 'filterDone',
      'click #filter-todo': 'filterTodo',
      'click #performance': 'performanceCheck',
    },
	initialize: function() {
		this.$list = $('#task-list');
		this.$form = $("#create-task-form");

		this.listenTo(Tasks, 'add', this.add);
		this.listenTo(Tasks, 'filter', this.filter);
	},
	add: function(todo) {
      var view = new TaskView({model: todo});
      this.$list.append(view.render().el);
    },
    createTask: function () {
    	var title = this.$form.find('input').val();
    	if (title != '') {
    		Tasks.add({title: title});
    	}

    	this.$form[0].reset();

    	return false;
    },
    filter: function(e) {
    	Tasks.each(function(task) {
    		task.trigger('visible', e)
    	});
    },
    filterAll: function() {
		Tasks.trigger('filter', 'all');
    },
    filterDone: function() {
		Tasks.trigger('filter', 'done');
    },
    filterTodo: function() {
		Tasks.trigger('filter', 'todo');
    },
    performanceCheck: function () {
    	var start = new Date().getTime();
		for(var i = 0; i <= 10000; i++) {
			Tasks.add({title: 'Tâche ' + i});
		}
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + time + 'ms');
    }
});
var Container = new ContainerView();