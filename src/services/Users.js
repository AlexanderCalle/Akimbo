import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./Firebase";
import toast from "react-hot-toast";
import { getEnv } from "../utils/getEnv";

const collection_name = "users" + getEnv();

const GetUser = async () => {
    let userId;
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        userId = user.uid;
      }
    });
    const userRef = doc(db, collection_name, userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()) return await userSnap.data();
    else return "No such user!"
}

const GetAuthor = async (userRef) => {
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  return userData;
}

const GetUsers = async () => {
  try {
    const data = [];
    
    const qeurySnapshot = await getDocs(collection(db, collection_name));

    qeurySnapshot.forEach((doc) => {
      const docData = doc.data();
      let user = {id: doc.id, ...docData}
      data.push(user);
    });

    return data;
  } catch (error) {
    toast.error(error)
  }
}

export {GetUser, GetAuthor, GetUsers}