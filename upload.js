const AWS = require("aws-sdk");
const sharp = require('sharp');
const fs = require('fs');

class Upload {
    constructor(access, secret, region, bucket) {
        this.access = access;
        this.secret = secret;
        this.region = region;
        this.bucket = bucket;

        const s3 = new AWS.S3({
            accessKeyId: access,
            secretAccessKey: secret,
            region: region,
        })
        this.s3 = s3;
    }

    uploadFile(image, bucket = false, compress = false) {
        let bucketName = bucket ? bucket : this.bucket,
            compressedImage = image;

        if (compress) {
            const fileContent = fs.readFileSync(image.path);
            compressedImage = sharp(fileContent)
                .jpeg({ quality: 50 })
                .png({ quality: 50 });
        }
        const params =  {
            Bucket: `${bucketName}`,
            Key: image.name,
            Body: compressedImage
        }

        const url = new Promise(resolve => {
            this.s3.upload(params, (err, data) => {
                if (err) {
                    throw new Error(err)
                } else {
                    resolve(data.Location);
                }
            })
        });

        return url;
    }
}

module.exports = Upload;