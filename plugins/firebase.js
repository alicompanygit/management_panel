// plugins/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const appType = import.meta.env.VITE_APP_TYPE;

const firebaseConfig =
  appType == 'metama'
    ? {
        apiKey: 'AIzaSyCO6ckbe-2-2FBkW9Ipy9kKNffaujRr170',
        authDomain: 'metama-8a17e.firebaseapp.com',
        projectId: 'metama-8a17e',
        storageBucket: 'metama-8a17e.firebasestorage.app',
        messagingSenderId: '832106554073',
        appId: '1:832106554073:web:ffe9f1cbc1181d9e5354c8',
      }
    : {
        apiKey: 'AIzaSyCnW2U_KD_v0O-bjWvqwhO4qwOI9_K1hSE',
        authDomain: 'nava-tel.firebaseapp.com',
        projectId: 'nava-tel',
        storageBucket: 'nava-tel.appspot.com',
        messagingSenderId: '586769003980',
        appId: '1:586769003980:web:480223c89a8c63f60fd969',
        measurementId: 'G-ST1YBBWN9G',
      };

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, firebaseApp, firestore };
