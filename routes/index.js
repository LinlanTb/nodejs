var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var conn = 'mongodb://localhost:27017/dianming';
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
		title: '点名',
		name: req.cookies['name']
	});

});
//录入学生信息
router.get('/add',function(req,res){
	res.render('add',{});
});
router.get('/dm',function(req,res){
	MongoClient.connect(conn,function(err,db){
		if(err){
			console.log(err);
		}else{
			var con = db.collection('user');
			con.find().toArray(function(err,result){
				if(err){
					console.log(err);
				}else{
					var random = parseInt(Math.random()*result.length)+1;
					result.forEach(function(item,index){
						if(index == random){
							res.cookie('name', item.name, {
								maxAge: 1000 * 2
							});
							res.redirect('/');
						}
					});
				}
			});
		}
	});
})
module.exports = router;
