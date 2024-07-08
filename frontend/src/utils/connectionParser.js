import { fileReader } from "./fileReader";

export async function connectionParser(file) {
    try{
        const contents = await fileReader(file);
        const lines = contents.split('\n');
        const data = [];
        lines.forEach(function(line) {
        line = line.trim();
        if (line !== '') {
            const parts = line.split(' ');
            const from = parseInt(parts[4]);
            const to = parseInt(parts[6]);
            const type = parts[7];
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
    catch(e){
        console.error(e);
        return null;
    }
}