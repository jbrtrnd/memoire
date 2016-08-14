
var TaskContainer = React.createClass({
	getInitialState: function() {
	    return {
	    	tasks: [],
	    	filter: 'all'
	    };
	},
	handleTaskSubmit: function(task) {
		this.state.tasks.push(task);
   		this.setState({
   			tasks: this.state.tasks
		});
  	},
  	handleFilterChange: function(filter) {
		this.setState({
   			filter: filter
		});
  	},
	render: function () {
		return (
			<div>
				<PerformanceCheck callback={this.handleTaskSubmit}/>
				<div className="container">
					<TaskForm onTaskSubmit={this.handleTaskSubmit} />
					<TaskList tasks={this.state.tasks} filter={this.state.filter}/>
					<TaskFilter filter={this.state.filter} onFilterChange={this.handleFilterChange}/>
				</div>
			</div>
		)
	},
});

var TaskForm = React.createClass({
	getInitialState: function() {
	    return {
	    	title: '', 
	    	status: 'todo'
    	};
  	},
  	handleTitleChange: function(e) {
    	this.setState({
    		title: e.target.value
		});
  	},
  	handleSubmit: function(e) {
	    e.preventDefault();
	    var title  = this.state.title;
	    var status = this.state.status;
	    if (!title) {
	      return;
	    }
	    
	    this.props.onTaskSubmit({
	    	title: title, 
	    	status: status
    	});

	    this.setState({
    		title: '', 
    		status: 'todo'
		});
  	},
  	render: function() {
	    return (
	    	<form onSubmit={this.handleSubmit}>
	    		<div className="create-container row">
	    			<div className="col col-input">
						<input type="text" name="title" placeholder="Nouvelle tâche" value={this.state.title} onChange={this.handleTitleChange} />
					</div>
					<div className="col col-submit">
						<button type="submit">
							<i className="fa fa-plus-circle"></i>
						</button>
					</div>
	    		</div>
	    	</form>
		);
  	}
});

var TaskList = React.createClass({
	render: function() {
		var filter = this.props.filter;
		var taskNodes = this.props.tasks.map(function(task) {
			if (task.status === filter || filter === 'all') {
	      		return (
	        		<Task task={task}></Task>
	      		);
      		}
      		return;
	    });

	    return (
	    	<div>
	    		{taskNodes}
	    	</div>
    	);
  	},
});

var Task = React.createClass({
	toggleStatus: function () {
		var status = this.state.status === 'todo' ? 'done' : 'todo';
		this.setState({
    		status:  status
		});

		this.props.task.status = status;
	},
	getInitialState: function() {
	    return {
	    	title: this.props.task.title, 
	    	status: this.props.task.status
    	};
  	},
	render: function () {
		var classes = classNames('task', {
			todo: this.state.status == 'todo',
			done: this.state.status == 'done',
		});

		return (
			<div className={classes}>
				{this.state.title}
				<i className="fa fa-check-circle" onClick={this.toggleStatus}></i>
			</div>
		);
	}
});

var TaskFilter = React.createClass({
	getInitialState: function() {
	    return {
	    	filter: this.props.filter
    	};
  	},
  	handleFilterChange: function (filter) {
  		this.setState({
  			filter: filter
  		});

  		this.props.onFilterChange(filter);
  	},
	render: function () {
		var classes = {
			all: classNames({
				active: this.state.filter === 'all' 
			}),
			todo: classNames({
				active: this.state.filter === 'todo' 
			}),
			done: classNames({
				active: this.state.filter === 'done' 
			}),
		};

		return (
			<div className="task-filters row">
				<div className="col">
					<button type="button" className={classes.all} onClick={this.handleFilterChange.bind(this, 'all')}>
						Toutes
					</button>
				</div>
				<div className="col">
					<button type="button" className={classes.todo} onClick={this.handleFilterChange.bind(this, 'todo')}>
						A Faire
					</button>
				</div>
				<div className="col">
					<button type="button" className={classes.done} onClick={this.handleFilterChange.bind(this, 'done')}>
						Faite
					</button>
				</div>
			</div>
		);
	}
});

var PerformanceCheck = React.createClass({
	createTasks: function () {
		this.start = new Date().getTime();
		for(var i = 0; i <= 10000; i++) {
			this.props.callback({
				title: 'Task ' + i,
				status: 'todo'
			})
		}
		
		
	},
	render: function () {
		return (
			<button onClick={this.createTasks}>Performance test</button>
		);
	},
	componentDidUpdate : function() {
		var end = new Date().getTime();
		var time = end - this.start;
		console.log('Execution time: ' + time + 'ms');
  	},
});

ReactDOM.render(
	<TaskContainer />,
	document.getElementById('content')
);