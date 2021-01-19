import express from 'express';
import data from '../data.js';
import ImgSet from '../models/imgSetModel.js';
import ImgData from '../models/imageDataModel.js';
import expressAsyncHandler from 'express-async-handler';

const commonRouter = express.Router();

commonRouter.get(
    '/seed',
    expressAsyncHandler(async(req, res) => {
    const imgSets = await ImgSet.insertMany(data.image_sets);
    const imgData = await ImgData.insertMany(data.images_data);
    res.send({imgSets, imgData});
})
);

commonRouter.get(
  '/images',
  expressAsyncHandler(async(req, res) => {
  const imgSet = await ImgSet.findOne({isComplete : false});
  if(imgSet)
  {
    const numberOfSetLeft = await ImgSet.find({isComplete : false}).count();
    const imageData = await ImgData.find({set_id : imgSet.set_id});
    const numberOfImagesLeft = await ImgData.find({isBaseImg : false, result : { "$eq": "select"}}).count();
    res.send({imageData, numberOfSetLeft, numberOfImagesLeft});
  }
  else{
    res.status(404).send({message : 'No Remaining Tasks Avaliable'});
  }
})
);

commonRouter.post(
  '/completeSet',
  expressAsyncHandler(async (req, res) => {
    const set_Id = req.body.set_id;
    const values = req.body.values;
    for(const value in values){
      console.log(value, values[value] );
        var updateImageData = await ImgData.findByIdAndUpdate(value, {result : values[value]});
    }
    const updateImageSet = await ImgSet.findOneAndUpdate({set_id:set_Id}, {isComplete:true}, {new: true});
    res.send({updateImageData, updateImageSet});
  })
);

commonRouter.get(
  '/restart',
  expressAsyncHandler(async(req, res) => {
  const imgSet = await ImgSet.updateMany({},{isComplete : false});
  const imageData = await ImgData.updateMany({},{result : "select"});
  //console.log(imgSet, imageData);
  res.send({imgSet, imageData});
})
);

export default commonRouter;