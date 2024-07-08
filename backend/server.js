const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/config');
const connectionRoutes = require('./routes/connectionRoutes');
const serviceRoutes = require('./routes/servicesRoutes');

app.use(cors());
app.use(express.json());
app.use('/connection',connectionRoutes);
app.use('/service',serviceRoutes);

const PORT = process.env.PORT||5000;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Connected on port ${PORT}`);
    })
});
