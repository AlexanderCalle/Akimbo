import { Timestamp, addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { getEnv } from "../utils/getEnv";
import { db, storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const collection_name = "cta" + getEnv();

const GetAll = async () => {
  const querySnap = await getDocs(query(collection(db, collection_name), orderBy("created_date", "desc")));

  let data = querySnap.docs.map((doc) => {
    const docData = doc.data();
    return { id: doc.id, ...docData };
  });

  return data;

}

const GetById = async (id) => {
  const querySnap = await getDoc(doc(db, collection_name, id));
  const docData = querySnap.data();
  return { id: querySnap.id, ...docData };
}


const GetActiveCta = async () => {
  const querySnap = await getDocs(
    query(
      collection(db, collection_name), 
      and(
        where("startdate", "<=", new Date()),
        where("enddate", ">=", new Date())
      ),
      orderBy("start_date", "asc"),
    )
  );

  let data = querySnap.docs.map((doc) => {
    const docData = doc.data();
    return { id: doc.id, ...docData };
  });

  return data;

}

const CreateCta = async ({title, description, start_date, end_date, backgroundColor, image}) => {
  try {

    let data = {
      title, 
      description, 
      start_date, 
      end_date,
      backgroundColor,
      created_date: Timestamp.now(),
    };

    if(image != null) {
      const storageRef = ref(storage, "ctaImages/" + image.name)
      const snapshot = await uploadBytes(storageRef, image)
      data = {...data, image: await getDownloadURL(snapshot.ref)}
  }

    const docRef = await addDoc(collection(db, collection_name), data);

    return docRef.id;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const UpdateCta = async ({title, description, start_date, end_date, backgroundColor, image, docId}) => {
  try {
    let data = {
      title, 
      description, 
      start_date, 
      end_date,
      backgroundColor,
    };

    if(image != null) {
      const storageRef = ref(storage, "ctaImages/" + image.name)
      const snapshot = await uploadBytes(storageRef, image)
      data = {...data, image: await getDownloadURL(snapshot.ref)}
    }

    await updateDoc(doc(db, collection_name, docId), data);

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const DeleteCta = async (id) => {
  try {
    await deleteDoc(doc(db, collection_name, id));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export { GetAll, GetById, GetActiveCta, CreateCta, UpdateCta, DeleteCta};