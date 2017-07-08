var express = require('express');
var router = express.Router();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var conn = 'mongodb://localhost:27017/dianming';
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//学生信息录入
router.post('/add',function(req,res){
	MongoClient.connect(conn,function(err,db){
		if(err){
			console.log(err);
		}else{
			console.log('连接数据库成功');
			var con = db.collection('user'); 
			var data = [{name: req.body['username'],number:req.body['number']}];
			console.log(data);
			con.insert(data, function(err, result) {
	            if (err) {
	                console.log(err);
	            } else {
	                if(result.result.ok == 1){
						res.redirect('/add');
					}else{
						res.send('录入失败');
					}
	            }
       		});
		}
	});
});
module.exports = router;
