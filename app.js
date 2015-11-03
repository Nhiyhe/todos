var express = require('express');
var app = express();
var todos = require('./todos');

var port = process.env.PORT | 3020;

app.use(express.static(__dirname + '/public'));

var middleware = {
	logger : function(req,res,next){
		console.log('Hello ' + req.method);
		next();
	},
	
	security:function(req,res,next){
		console.log('private route hit');
		next();
	}
}

app.get('/todos',function(req,res){
	res.json(todos);
});

app.get('/todos/:id',function(req,res){
	var matchedTodo ;
	var findtodo = parseInt(req.params.id,10);
	todos.forEach(function(item){
		if(item.id === findtodo)
		matchedTodo = item;
	})
if(matchedTodo){
	res.json(matchedTodo);
}else{
	res.status(404).send();
}

});


app.use(middleware.logger);

app.set('view engine','vash');

app.get('/',function(req,res){
	res.render('index');
});


app.get('/course', middleware.security, function(req,res){
	res.send("Course Home Page");
});


app.get('/course/:query',function(req,res){
	res.send('course page with course query');
	console.log(req.query.query);
});


app.get('/course/:id',function(req,res){
	res.send("Course Home Page " + req.params.id);
});


app.listen(port,function(){
	console.log('Server is running on port ' + port);
});