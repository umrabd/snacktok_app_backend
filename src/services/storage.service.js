const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  try{
    const result = await imagekit.upload({
      file: file,
      fileName: fileName,
    });
    return result;
  }
  catch(err){
    console.error('Error uploading file to ImageKit:', err);
    throw err;
  
}
}
module.exports = {
    uploadFile,
};