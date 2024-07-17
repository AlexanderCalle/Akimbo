import { collection, getDocs } from "firebase/firestore"
import { db } from "./Firebase"
import { getEnv } from "../utils/getEnv";

const collection_name = "categories" + getEnv();

const GetAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, collection_name));
    const data = [];

    querySnapshot.forEach(doc => {
        const category = {catRef: doc.ref,  ...doc.data()}

        data.push(category);
    })
    return data;
}

export {GetAllCategories}