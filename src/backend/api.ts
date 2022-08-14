import express from 'express';
import AWS from 'aws-sdk';

const app = express()
const port = 3000
let photoUrls = []


function getPhotos() {
    AWS.config.update({region: 'us-west-2'});
    // Create S3 service object
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket : 'serena-portfolio',
    };

    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
    });
}

app.get('/getUrls', async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.send(photoUrls)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

getPhotos() // called once on app start to not run into rate limiting issues