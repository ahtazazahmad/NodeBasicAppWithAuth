const formidable = require('formidable');
const fs = require('fs');

var Minio = require('minio');


// const minioClient = new Minio.Client({
//   endPoint: process.env.MINIO_ENDPOINT,
//   port:9000,
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY,
//   secretKey: process.env.MINIO_SECERT_KEY,
// });
const minioClient = new Minio.Client({
  endPoint: "minio",
  port: 9000,
  useSSL: false,
  accessKey: "fZeriJKnZNL7Dwbp",
  secretKey: "JqWuJiuyiSdDjIS1r8BAiSeMF4UDRNu9",
});

const minioBucketName = "second-bucket";
//create minio bucket with Listing
(async () => {
  console.log(`Creating Bucket: ${minioBucketName}`);
  
  await minioClient.makeBucket(minioBucketName, 'us-east-1').catch((e) => {
    console.log(`Error while creating bucket '${minioBucketName}': ${e.message}`);
  });

  //Listing all buckets...
  const bucketsList = await minioClient.listBuckets();
  console.log(`Buckets List: ${bucketsList.map((bucket) => bucket.name).join(",\t")}`  );
})();


module.exports = {

	uploadImage(req, res, next) {
    (async () => {
    
      let name = req.file.originalname.split('.');
	  //for low capicity we can use this and this is just pass file to mino with check our node js 
	  minioClient.putObject(minioBucketName, name[0], req.file.buffer, function(error, etag) {
        if(error) {
            res.send(error);
        }
        res.send(etag);
    });
//we use this using node js stream for long file and maintaing server issue for req.file.path we need to edit multer
// minioClient.fPutObject(minioBucketName, name[0], req.file.path, "application/octet-stream", function(error, etag) {
// 	if(error) {
// 		return console.log(error);
// 	}
// 	res.send(etag);
// });
    })();
  },



	getImage(req, res, next) {
		let data;
		minioClient.getObject(minioBucketName, req.params.id, function(err, objStream) {
			if (err) {
				return console.log(err)
			}
			objStream.on('data', function(chunk) {
				data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
			})
			objStream.on('end', function() {
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.write(data);
				res.end();
			})
			objStream.on('error', function(err) {
				res.status(500);
				res.send(err);
			})
		});
	}

};