const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const {retrieveIdConnections, uploadConnectionData, uploadServicesData} = require('./mongodb');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! yes');
});

app.get('/view',async (req,res)=>{
  const {id}=req.query;
  const data = await retrieveIdConnections(parseInt(id));
  const nodes_reached = data.reduce((acc, item) => {
      const existingItem = acc.find((el) => el.to === item.to);
      if (existingItem) {
        if (!existingItem.type.includes(item.type)) {
          existingItem.type.push(item.type);
        }
      } else {
        acc.push({ to: item.to, type: [item.type] });
      }
      return acc;
    }, []);
  res.json(nodes_reached);
})

app.get('/details',(req,res)=>{
  
})

app.post('/connection', async (req, res) => {
  const response = await uploadConnectionData(req.body);
  if(response===null){
    res.status(500).json({ error: 'Internal server error' });
  }
  else{
    res.json({
      message: `${response.insertedCount} documents inserted`
    });
  }
});

app.post('/service',async (req,res)=>{
  const response = await uploadServicesData(req.body);
  if(response===null){
    res.status(500).json({ error: 'Internal server error' });
  }
  else{
    res.json({
      message: `${response.insertedCount} documents inserted`
    });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
