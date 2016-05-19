var json2html = require('node-json2html');
var fs = require("fs");
var http = http = require('http'),url = require('url');

var filename = "/data/cont-stats.json";

var metatag = {'tag':'meta http-equiv="refresh" content="15"', 'html':''};

http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html'});

     var data = fs.readFileSync(filename);
     var jsondata = JSON.parse(data);
     
     var cpuUsage = 0;
     var memUsage = 0;
     var netUsage = 0;
     var dskUsage = 0;

       
    for(var i=0;i<jsondata.length;i++) {
        cpuUsage += parseInt(jsondata[i].precpu_stats.cpu_usage.total_usage);
        
    } 
  
    for(var i=0;i<jsondata.length;i++) {
        memUsage += parseInt(jsondata[i].memory_stats.usage);
        
    }

    for(var i=0;i<jsondata.length;i++) {
        netUsage = netUsage +
                   parseInt(jsondata[i].networks.eth0.rx_bytes) +
                   parseInt(jsondata[i].networks.eth0.tx_bytes);
        
    }
  
    for(var i=0;i<jsondata.length;i++) {
        // TODO: change the logic to read the disk data
        dskUsage += parseInt(jsondata[i].networks.eth0.tx_bytes);
        
    }
 
    var tablecontent={"tag":"tr","children":[{"tag":"th style='visibility:hidden;'","html":""},{"tag":"th style='text-align: center;'","html":"CPU</br>"+cpuUsage},{"tag":"th style='text-align: center;'","html":"Memory</br>"+memUsage},
                {"tag":"th style='text-align: center;'","html":"Network</br>"+netUsage},{"tag":"th style='text-align: center;'","html":"Disk</br>"+dskUsage}]};
    var tabledata ={"tag":"tr","children":[{"tag":"td style='padding-left:25px; padding-right:25px;'","html":"${Name}"},{"tag":"td style='text-align: right;padding-left:25px; padding-right:25px;'","html":"${precpu_stats.cpu_usage.total_usage}"},{"tag":"td style='text-align: right;padding-left:25px; padding-right:25px;'","html":"${memory_stats.usage}"},
                {"tag":"td style='text-align: right; padding-left:25px; padding-right:25px;'","html":"${networks.eth0.rx_bytes}"},{"tag":"td style='text-align: right; padding-left:25px; padding-right:25px;'","html":"${networks.eth0.tx_bytes}"}]};
    
 
    response.write(json2html.transform({},metatag));
    response.write("<table style='background-color:LightGray; float: center; padding:25px 25px 25px 25px;'>");
    response.write("<thead><bold>");
    response.write(json2html.transform({},tablecontent));
    response.write("</bold></thead>");
    response.write("<tbody>");
    response.write(json2html.transform(jsondata,tabledata));
    response.write("</tbody>");
    response.write("</table>");
    response.end();
}).listen(5000);
console.log("Server listening to port : 5000");

