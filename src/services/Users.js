import { doc, getDoc, getDocs, collection, Timestamp, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db, secondaryAuth, storage } from "./Firebase";
import toast from "react-hot-toast";
import { getEnv } from "../utils/getEnv";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

    if(userSnap.exists()) {
      let data = await userSnap.data()
      return {...data, id: userId}
    }
    return "No such user!"
}

const GetUserById = async (id) => {
  const userRef = doc(db, collection_name, id);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()) 
      return await userSnap.data();
    return "No such user!"
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

const CreateUser = async ({
  firstname,
  lastname,
  email,
  password,
  description,
  borderColor,
  rol,
  bio,
  image
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password)
    signOut(secondaryAuth)
    const storageRef = ref(storage, "profilePics/" + image.name)

    const snapshot = await uploadBytes(storageRef, image)
    const data = {
        firstname,
        lastname,
        email,
        description,
        rol,
        bio,
        borderColor,
        image: await getDownloadURL(snapshot.ref),
        created_date: Timestamp.now()
    }
  
    const docRef = await setDoc(doc(db, collection_name, userCredential.user.uid), data)
        
    return userCredential.user.uid
  } catch (error) {
    throw new Error(error)
  }
}

const UpdateUser = async ({
  id,
  firstname,
  lastname,
  email,
  description,
  borderColor,
  rol,
  bio,
  image
}) => {
  let data = {
    firstname,
    lastname,
    email,
    description,
    rol,
    bio,
    borderColor,
  }
  
  if(image != null) {
      const storageRef = ref(storage, "profilePics/" + image.name)
      const snapshot = await uploadBytes(storageRef, image)
      data = {...data, image: await getDownloadURL(snapshot.ref)}
  }

  await updateDoc(doc(db, collection_name, id), data)
}

export {GetUser, GetUserById, GetAuthor, GetUsers, CreateUser, UpdateUser}