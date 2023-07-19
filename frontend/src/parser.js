exports.parseRules = function parseTextFile1(contents) {
    let currentName;
    let lines = contents.split('\n');
    const data = [];
    let rule={service:"",permit:[],deny:[]};
    lines.forEach(function(line) {
      line = line.trim();
  
      if (line.startsWith('Ip access-list role-based')) {
        if(rule.service.length>0){
          data.push(rule);
        }
        rule={service:"",permit:[],deny:[]};
        var parts = line.split(' ');
        currentName = parts[3];
        rule.service=currentName;
      } 
      else if (line !== '') {
        const parts = line.split(' ');
        var action = parts[1];
        var service = parts[2];
        if(action==="permit")
          rule.permit.push(service);
        else
          rule.deny.push(service);
      }
    });
    if(rule.service.length>0) data.push(rule);
    return data;
}

exports.parseConnections = function parseTextFile2(contents) {
    let lines = contents.split('\n');
    const data = [];
    lines.forEach(function(line) {
      line = line.trim();
      if (line !== '') {
        const parts = line.split(' ');
        var from = parseInt(parts[4]);
        var to = parseInt(parts[6]);
        var type = parts[7];
        const obj = {
          "from":from,
          "to":to,
          "type":type
        }
        data.push(obj);

      }
    });
    return data;
}