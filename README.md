# AWS S3 IMAGE UPLOAD
 > An aws s3 image upload package, comes with image compression if you so choose to use this feature

 > Note: This package is in no way endorsed by AWS, but is a little pet project of mine i wish to make big one day

## Install
```javascript
npm i file-upload-s3
```
```javascript
yarn add file-upload-s3
```

## How to use

```
const express = require('express');
const formidable = require('formidable');

....

const AWS = require('../index');
const upload = new AWS.Upload({
    access: '',
    secret: '',
    region: '',
    bucket: ''
});

......

app.post('/upload', async (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
        if (err) {
            console.error(err.message);
            return;
        }
        
        const img = await upload.uploadFile(files.image, false, true) // (a, b, c)

            // a = 'image to be uploaded'
            // b = 'bucket name if you haven't provided it in the initialization earlier
            // c = 'compress, if true, the image would be compressed before sent off to aws s3, 
                false, the image won't be compressed'

        res.json(img)
    });
})

```

## Dev Server
```javascript
npm run start
```
```javascript
yarn start
```

## Production Bundle
```javascript
npm run build
```
```javascript
yarn build
```


### Follow me on Twitter: [@devopsjay](https://twitter.com/devopsjay)