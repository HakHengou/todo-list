// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB_rfkNno37tqmHMKPxo70H3j1Dqc51Fo0',
  authDomain: 'chat-notification-47ef8.firebaseapp.com',
  databaseURL: 'https://chat-notification-47ef8.firebaseio.com',
  projectId: 'chat-notification-47ef8',
  storageBucket: 'chat-notification-47ef8.appspot.com',
  messagingSenderId: '782227896045',
  appId: '1:782227896045:web:68ee35c7d25ff51a9e7ee4',
  measurementId: 'G-55N8S9GWZ7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export default db;