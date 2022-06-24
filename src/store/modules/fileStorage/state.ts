import S3 from 'aws-sdk/clients/s3';

const state = {
  BUCKET: process.env.VUE_APP_S3_BUCKET_NAME,
  bucket: new S3({
    accessKeyId: process.env.VUE_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_S3_SECRET_ACCESS_KEY,
    region: process.env.VUE_APP_S3_REGION
  })
};
export default state;
