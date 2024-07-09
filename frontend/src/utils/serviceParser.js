import { fileReader } from "./fileReader";

export async function serviceParser(file) {
    let currentName="";
    const content = await fileReader(file);
    const lines = content.split('\n');
    const data = [];
    let rule={service:"",allow:[],deny:[]};
    lines.forEach(function(line) {
      line = line.trim();
      if (line.startsWith('Ip access-list role-based')) {
        if(rule.service.length>0){
          data.push(rule);
        }
        rule={service:"",allow:[],deny:[]};
        const parts = line.split(' ');
        currentName = parts[3];
        rule.service=currentName;
      } 
      else if (line !== '') {
        const parts = line.split(' ');
        const action = parts[1];
        const service = parts[2];
        if(action=="permit")
          rule.allow.push(service);
        else
          rule.deny.push(service);
      }
    });
    if(rule.service.length>0) data.push(rule);
    return data;
}