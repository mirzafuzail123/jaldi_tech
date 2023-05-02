import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAvDo0jdg8yzZKKN9z8ewGdwYBYZFbC1o",
    authDomain: "business-manager-2daf6.firebaseapp.com",
    projectId: "business-manager-2daf6",
    storageBucket: "business-manager-2daf6.appspot.com",
    messagingSenderId: "278216679081",
    appId: "1:278216679081:web:d8cc80aa5ae968d10b53b8",
    measurementId: "G-XVPH8TD4LF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app