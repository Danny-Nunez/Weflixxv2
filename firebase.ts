// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAikEcbejgbqRvbYrFmYJxBOcgzas1zagw', 
  authDomain: 'streamflixv2.firebaseapp.com',
  databaseURL: 'https://streamflixv2-default-rtdb.firebaseio.com',
  projectId: 'streamflixv2',
  storageBucket: 'streamflixv2.appspot.com',
  messagingSenderId: '99620803960',
  appId: '1:99620803960:web:f4a871ce14a9c713cf248d',
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
