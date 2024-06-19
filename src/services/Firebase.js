import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNdZkY8Y-s3hGExVox45Q5B6OWYonuUj4",
  authDomain: "akimbo-20159.firebaseapp.com",
  projectId: "akimbo-20159",
  storageBucket: "akimbo-20159.appspot.com",
  messagingSenderId: "967780287122",
  appId: "1:967780287122:web:d174533ca3bd4807f09c4b",
  measurementId: "G-848QML9JK4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth(secondaryApp)

export { app, analytics, db, auth, storage, secondaryApp, secondaryAuth};

// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }
