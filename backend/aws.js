import AWS from 'aws-sdk';
import async from 'async';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

var AWS_KEY = process.env.ACCESS_KEY;
var AWS_SECRET = process.env.SECRET_KEY;
var BUCKET = 'imgcmptool';
//var PREFIX = 'imgcmptool';

export function downloadImagesFromS3(){
AWS.config.update({accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET});

const s3 = new AWS.S3();

const params = {
	Bucket: BUCKET,
	//Prefix: PREFIX
}

s3.listObjects(params, function(err, data){
	if (err) return console.log(err);

	async.eachSeries(data.Contents, function(fileObj, callback){
		var key = fileObj.Key;
		console.log('Downloading: ' + key);

		var fileParams = {
			Bucket: BUCKET,
			Key: key
		}

		s3.getObject(fileParams, function(err, fileContents){
			if (err) {
				callback(err);
			} else {
                var contents = fileContents.Body.toString();
                fs.writeFileSync(`./frontend/public/images/${key}`, fileContents.Body);
                //fs.writeFileSync(`${key}`, fileContents.Body);
				callback();
			}
		});
	}, function(err) {
		if (err) {
			console.log('Failed: ' + err);
		} else {
			console.log('Finished');
		}
	});
});
}
