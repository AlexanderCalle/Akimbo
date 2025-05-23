import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "./Firebase"
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";

const collection_name = "posts"

const PostDiaryItem = async ({title, content, description, author, image, image_title, image_author, bg_color, rgb_color}) => {

    try {
        var filename = image.name;  
        var currentdate = new Date();  
        var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();  
        filename = fileNamePredecessor + filename;
        var imageUrl = ""

        if(image) {
            const storageRef = ref(storage, "dairyImages/" + filename)

            const snapshot = await uploadBytes(storageRef, image);
            imageUrl = await getDownloadURL(snapshot.ref)
        }

        const t = Timestamp.fromDate(new Date())
        const created_date = t.toDate();
        const data = {
            title,
            content,
            description,
            author,
            image: imageUrl,
            image_title,
            image_author,
            bg_color,
            rgb_color,
            created_date
        }

        const docRef = await addDoc(collection(db, collection_name), data)
        return docRef.id

    } catch (error) {
        console.error(error);
        throw new Error(`Something went wrong uploading file: ${error.message}`)
    }

}

const UpdateDairyPostById = async ({title, content, description, author, image, image_title, image_author, bg_color, rgb_color, docId}) => {
    try {
        let data = {
            title,
            content,
            description,
            author,
            image_title,
            image_author,
            bg_color,
            rgb_color,
        }

        if(image) {
            var filename = image.name;  
            var currentdate = new Date();  
            var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();  
            filename = fileNamePredecessor + filename;
            const storageRef = ref(storage, "dairyImages/" + filename)

            const snapshot = await uploadBytes(storageRef, image);
            data = {...data, image: await getDownloadURL(snapshot.ref)}
        }

        await updateDoc(doc(db, collection_name, docId), data);

    } catch (error) {
        console.log(error);
       throw new Error("Someting went wrong while updating your dairy post")
    }
}

const GetAllDiaryItems = async () => {
    const querySnapshot = await getDocs(query(
        collection(db, collection_name),
        orderBy("created_date", "desc")
    ));

    const data = querySnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
    });

    return data;
}

const DeleteDairyItem = async (itemId) => {
    try {
        await deleteDoc(doc(db, collection_name, itemId));
        return "succes"
    } catch (error) {
        throw new Error("Something went wrong: " + error.message)
    }
}

const GetDairyItemById = async (articleId) => {
    const docRef = doc(db, collection_name, articleId);
    const snapshot = await getDoc(docRef);
    const docData = snapshot.data();

    let item = {id: doc.id, ...docData}
    
    return item
}

const GetMostRecentDairyItem = async () => {
    try {
        const data = await GetAllDiaryItems();
        return data.sort((a, b) => (a.created_date > b.created_date) ? -1 : 1).slice(0,3);
    } catch (error) {
        throw new Error("Something went wrong fetching data.")
    }
}

export {PostDiaryItem, GetAllDiaryItems, DeleteDairyItem, GetDairyItemById, UpdateDairyPostById, GetMostRecentDairyItem}