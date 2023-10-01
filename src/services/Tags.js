import { collection, getDocs } from "firebase/firestore"
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

export {GetAllTags}