export function parseTextFile2(contents) {
    var lines = contents.split('\n');
    const data = [];
    lines.forEach(function(line) {
      line = line.trim();
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
  
      }
    });
    return data;
}