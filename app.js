
var http = require('http');
var url = require('url');
var template_fs = require("fs");
var path  = require("path");

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var url_path = url.parse(req.url);

    var media_resource_expression = /.css|.png|.gif|.js/gi;

    var ext = path.extname(url_path.pathname);

    var getContent_type = function(ext){
        var Content_type_list = {'.html':'text/html','.htm':'text/html','.png':'image/png','.css':'text/css','.js':'application/x-javascript','.gif':'image/gif'};
        Content_type_list = eval(Content_type_list);
        return Content_type_list[ext];
    };

    if (ext.length > 0) {
        res.writeHead(200,{'Content-Type':" "+getContent_type(path.extname(url_path.pathname))});
    }
    else {
        res.writeHead(200,{'Content-Type':' text/html'});
    }

    if ( media_resource_expression.test(path.extname(url_path.pathname)) ) {
        var filename = url_path.pathname.split('');
        filename[0] = '';
        template_fs.readFile(filename.join(''),"", function (err, data) {
            res.end(data);
        });
    }
    else {

        switch (url_path.pathname ) {
            case "/admin":
                res.end('admin page'+url_path.pathname+"\nquery_string:"+url_path.query);
            break;
            case "/index":
               template_fs.readFile('index.html',"utf8", function (err, data) {
                      if (err) throw err;
                      res.end(data);
                });
            break;
            case "/user":
                res.data("NULL");
            break;
            default:
                res.end('un'+url_path.pathname);
            break;
        }
    }
}).listen(process.env.VMC_APP_PORT || 1337, null);

function readFile (file) {
    template_fs.readFile(file,"utf8", function (err, data) {
           if (err) throw err;
        return data;
    });
}

