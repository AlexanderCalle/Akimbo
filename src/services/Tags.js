import { collection, getDoc, getDocs } from "firebase/firestore"
import { db } from "./Firebase"

const GetAllTags = async () => {
    const querySnapshot = await getDocs(collection(db, "tags"));
    const data = [];

    querySnapshot.forEach(doc => {
        const tag = {value: doc.ref, label: doc.data().name, ...doc.data()}

        data.push(tag);
    })
    return data;
}

const getTag = async (docRef) => {
    const doc = await getDoc(docRef);

    const tag = {value: docRef, label: doc.data().name, ...doc.data()}
    return tag;
}

export {GetAllTags, getTag}