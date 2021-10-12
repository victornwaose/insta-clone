import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCkzhSg4wI38Ia7fjnjJzLmHLHQhylULHE",
    authDomain: "instagram-clone-a1e0f.firebaseapp.com",
    projectId: "instagram-clone-a1e0f",
    storageBucket: "instagram-clone-a1e0f.appspot.com",
    messagingSenderId: "428671275160",
    appId: "1:428671275160:web:f57d870ace049496a9c0ed",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
