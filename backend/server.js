import express from 'express';
import mongoose from 'mongoose';
import commonRouter from './routers/commonRouter.js';
import dotenv from 'dotenv';
import {downloadImagesFromS3} from './aws.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

downloadImagesFromS3();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/image_cmp',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
});


app.use('/api/getdata', commonRouter);

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use((err, req, res, next) => {
    res.status(500).send({message : err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Running at ${port}`)
})