import * as AWS from 'aws-sdk'
import { JSDOM } from 'jsdom';
import { writeFileSync } from 'fs'
import {resolve} from 'path';
import * as pretty from 'pretty'

let s3: AWS.S3;
const bucketName = 'serenachan.io';
const htmlFilePath = resolve(__dirname, '../../art.html')
console.log('htmlFilePath', htmlFilePath)

function initAWS() {
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'eu-west-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:68536981-9bf0-450c-8105-0a9971212e65',
    });
    s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: bucketName}
    });
}

function getHtml(template) {
    return template.join('\n');
}

async function getDOM() {
    const dom = await JSDOM.fromFile(htmlFilePath)
    return dom
}

async function addAlbumToHTML() {
    const dom = await getDOM()
    const albumName = 'album'
    var albumPhotosKey = encodeURIComponent(albumName) + '/';
    const request = s3.listObjects({Bucket: bucketName, Prefix: albumPhotosKey})
    const href = request.httpRequest.endpoint.href
    const bucketUrl = href + bucketName + '/';
    const response = await request.promise()
    const photoHtmlStrings = []
    for(const photo of response.Contents) {
        const photoKey = photo.Key;
        console.log('photoKey',photoKey)
        if(photoKey != 'album/' && !photoKey.endsWith('_thumbnail.jpg')) {
            const photoUrl = bucketUrl + encodeURIComponent(photoKey);
            
            const res = await s3.headObject({Bucket: bucketName, Key: photoKey}).promise()
            const {height, width} = (res as AWS.S3.HeadObjectOutput).Metadata
            
            // const thumbnailUrl = bucketUrl + encodeURIComponent(photoKey.replace('.jpg','_thumbnail.jpg'))
            photoHtmlStrings.push(getHtml([
                `<a href="${photoUrl}" data-pswp-width="${width}" data-pswp-height="${height}" target="_blank">`,
                    `<img src="${photoUrl}" alt=""/>`,
                '</a>'
            ]));
        }
    }
    const galleryDiv = dom.window.document.getElementById('my-gallery');
    galleryDiv.innerHTML = getHtml(photoHtmlStrings)
    // write new dom
    writeFileSync(htmlFilePath, pretty(dom.serialize()))
}

async function main() {
    initAWS();
    await addAlbumToHTML();
}

main().catch();


