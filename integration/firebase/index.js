const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const fs = require('fs');
// CHANGE: The path to your service account
var serviceAccount = require('../../config/firebase-admin.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "like-it-got-it.appspot.com"
});

var bucket = admin.storage().bucket();

async function uploadFile(arrayOfPics) {
    console.log('Upload', arrayOfPics)
    try {   
        let listOfUrl = []
        for (let image in arrayOfPics) {
            const id = uuid()
            const metadata = {
                metadata: {
                // This line is very important. It's to create a download token.
                firebaseStorageDownloadTokens: id
                },
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
            };
    
            // Uploads a local file to the bucket
            const imageUpload = await bucket.upload(arrayOfPics[image], {
                // Support for HTTP requests made with `Accept-Encoding: gzip`
                gzip: true,
                public: true,
                metadata: metadata
            });
            const instanceImage = imageUpload[0].metadata
            const url = `https://firebasestorage.googleapis.com/v0/b/${instanceImage.bucket}/o/${instanceImage.name}?alt=media&token=${id}`
            listOfUrl.push(url);
            //remove in local storage
            await fs.unlinkSync(arrayOfPics[image])
        }

        return [null,listOfUrl]
    } catch (error) {
        return [error,null]
    }
    

}
module.exports = {
    uploadFile
}

