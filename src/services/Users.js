import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./Firebase";


// Get a list of cities from your database
const GetUser = async () => {
    let userId;
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        userId = user.uid;
      }
    });
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()) return await userSnap.data();
    else return "No such user!"

}

const GetAuthor = async (userRef) => {
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return `${userData.firstname} ${userData.lastname}`
}

export {GetUser, GetAuthor}