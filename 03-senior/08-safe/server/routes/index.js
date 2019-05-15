var express = require('express');
var router = express.Router();

const comment = {

}

/* GET home page. */
router.get('/', function(req, res, next) {
	const xss = req.query.xss
	res.set('X-XSS-Protection',0);
	res.render('index', { title: 'Express',xss:xss });
});

router.get('/add', function(req, res, next) {
	const val = req.query.val
	comment.val = val
	res.json({
		code:0
	})
});

router.get('/get', function(req, res, next) {
	res.json({
		code:0,
		data:comment.val
	})
});


module.exports = router;
