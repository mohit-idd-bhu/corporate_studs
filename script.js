var currentName = '';

window.onload = function() {
  var fileInput1 = document.getElementById('fileInput1');
  var fileInput2 = document.getElementById('fileInput2');
  var parseButton = document.getElementById('parseButton');
  var resetButton = document.getElementById('resetButton');
  let data1=[],data2=[]
  parseButton.addEventListener('click',async function() {
    if (fileInput1.files && fileInput1.files[0]) {
      var file1 = fileInput1.files[0];
      var reader1 = new FileReader();

      reader1.onload = function(e) {
        var contents1 = e.target.result;
        data1=parseTextFile1(contents1);
        console.log(data1);
        axios.post('http://localhost:3000/service', data1)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
      };
      reader1.readAsText(file1);
    }
    if (fileInput2.files && fileInput2.files[0]) {
      var file2 = fileInput2.files[0];
      var reader2 = new FileReader();

      reader2.onload = function(e) {
        var contents2 = e.target.result;
        data2 = parseTextFile2(contents2);
        console.log(data2);
        axios.post('http://localhost:3000/connection', data2)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
      };
      reader2.readAsText(file2);
    }
  });


  resetButton.addEventListener("click",(e)=>{
    axios.delete('http://localhost:3000/reset')
    .then(res=> console.log(res))
    .catch(err=> console.log(err));
  });
};

function parseTextFile1(contents) {
  // Parsing logic for the first file
  var lines = contents.split('\n');
  var output = document.getElementById('output');

  // Perform parsing and output for file 1
  const data = [];
  let rule={service:"",permit:[],deny:[]};
  lines.forEach(function(line) {
    line = line.trim();

    // Check if the line starts with "Ip access-list role-based"
    if (line.startsWith('Ip access-list role-based')) {
      if(rule.service.length>0){
        data.push(rule);
      }
      rule={service:"",permit:[],deny:[]};
      var parts = line.split(' ');
      currentName = parts[3];
      output.innerHTML += currentName + ': ' + '<br>';
      rule.service=currentName;
    } 
    else if (line !== '') {
      var parts = line.split(' ');
      var action = parts[1];
      var service = parts[2];
      if(action=="permit")
        rule.permit.push(service);
      else
        rule.deny.push(service);
      output.innerHTML += action + ' ' + service + '<br>';
    }
  });
  if(rule.service.length>0) data.push(rule);
  return data;
}
output.innerHTML += '<br>';
function parseTextFile2(contents) {
  // Parsing logic for the second file
  var lines = contents.split('\n');
  var output = document.getElementById('output');

  // Perform parsing and output for file 2
  const data = [];
  lines.forEach(function(line) {
    line = line.trim();

    // Check if the line starts with "Ip access-list role-based"
    if (line !== '') {
      var parts = line.split(' ');
      var from = parseInt(parts[4]);
      var to = parseInt(parts[6]);
      var type = parts[7];
      const obj = {
        "from":from,
        "to":to,
        "type":type
      }
      data.push(obj);

      output.innerHTML += 'from: '+ from + ', to: ' + to+', type: '+type + '<br>';
    }
  });
  return data;
}
