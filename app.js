var express = require('express')
var app = express()

// 监听端口
app.listen(1337, '0.0.0.0', function () {
  console.log('Open successfully!')
})


// 不使用也可以打开主页,打开页面的基础
app.get('/*', function(req, res) {
    // 使用默认参数，除了根路径要改变
    var options = {
        root: './',
        dotfile: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    // 由于拿到的数据是个数组（前面用了*匹配），从index.html开始，所以filename取第一个
    var fileName = req.params[0]
    // 通过sendFile()函数取到主页面的内容并展现出来
    res.sendFile(fileName, options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end()
        }
        else {
            console.log('sent', fileName)
        }
    })
})



