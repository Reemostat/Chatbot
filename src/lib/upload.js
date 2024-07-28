import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./Firebase";

const upload = async (file) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const date = new Date();
const storageRef = ref(storage, `images/${date+ file.name}`);
const uploadTask = uploadBytesResumable(storageRef, file);

return new Promise((resolve, reject) => {

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    
  }, 
  (error) => {
    reject("Something went Wrong!" + error.code)
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL)
    });
  }
);
});

}

export default upload;