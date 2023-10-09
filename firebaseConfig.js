// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH2yQ8DjvfByLull1093CMZfr9ggzbCaY",
  authDomain: "controle-financeiro-55d4a.firebaseapp.com",
  projectId: "controle-financeiro-55d4a",
  storageBucket: "controle-financeiro-55d4a.appspot.com",
  messagingSenderId: "172482414362",
  appId: "1:172482414362:web:dcefda501c5cbd99b24ea3"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase