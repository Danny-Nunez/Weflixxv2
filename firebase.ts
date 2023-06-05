// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASEDATABASEURL_API_KEY,
  projectId: 'streamflixv2',
  storageBucket: 'streamflixv2.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASEMESSAGEID_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASEAPP_API_KEY,
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
