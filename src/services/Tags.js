import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "./Firebase"
import { Tag } from "../utils/Tag";
import { InvalidError } from "../utils/InvalidError";

const collection_name = "tags"

const GetAllTags = async () => {
    const querySnapshot = await getDocs(collection(db, collection_name));
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

const createTag = async (name, color) => {
    try {
        if(name.length === 0) throw new InvalidError("Name cannot be empty?.")
        if(color.length === 0) throw new InvalidError("Color cannot be empty.")
    
        const tag = new Tag(name, color)
    
        const docData = { 
            name: tag.name,
            color: tag.color
        }
        await addDoc(collection(db, collection_name), docData)

        return tag;
    } catch(error) {
        if(error instanceof InvalidError) {
            return error;
        }

        throw new Error("Something went wrong: " + error.message)
    }
}

export { GetAllTags, getTag, createTag }