const express = require('express')
const fs = require('fs');
var bodyParser = require('body-parser')
const chinaTime = require('china-time');
const app = express()
// 模板引擎
app.engine('html',require('express-art-template'))
// 表单处理
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 渲染首页
app.get('/',(request,response) => {
	// response.send('hello express')
	fs.readFile('./data.json',(err,data) => {
		if(err) {
			throw err
		}
		data = data.toString()
		data = JSON.parse(data)
		response.render('index.html',{
			posts: data.posts
		})
	})
})
// 渲染发表页面
app.get('/publish',function(request,response){
	response.render('publish.html')
})
// 处理发表请求
app.post('/publish',(request,response) => {
	const body = request.body
	console.log(body)
	body.time = chinaTime('YYYY-MM-DD HH:mm:ss')
	console.log(body)
	fs.readFile('./data.json',function(err,data){
		if(err){
			throw err
		}
		data = data.toString()
		data = JSON.parse(data)
		data.posts.unshift(body)
		data = JSON.stringify(data)
		fs.writeFile('./data.json',data,function(err){
			if(err){
				throw err
			}
			response.redirect('/')
		})
	})
	

	// response.send('hello express')

})
// 服务器
app.listen(3000, ()=>console.log('running...'))