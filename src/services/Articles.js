import { Timestamp, addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const GetAllArticles = async () => {
    const data = [];
    
    const qeurySnapshot = await getDocs(collection(db, "articles"));

    qeurySnapshot.forEach(async (doc) => {
        const docData = doc.data();
        let article = {id: doc.id, ...docData}
        data.push(article)
    })

    return data;
}

const PostArticle = async ({title, content, description, author, cat, tags, image, imageTitle, imageAuthor}) => {
    try {
        const storageRef = ref(storage, "articlesImages/" + image.name)

        const snapshot = await uploadBytes(storageRef, image)
        const t = Timestamp.fromDate(new Date())
        const created_date = t.toDate();
        const data = {
            title,
            content,
            description,
            author,
            cat,
            tags,
            image: await getDownloadURL(snapshot.ref),
            imageTitle,
            imageAuthor,
            created_date
        }

        const docRef  = await addDoc(collection(db, "articles"), data)
        
        return docRef.id
    
    } catch(err) {
        throw new Error(`Something went wrong uploading file: ${err.message}`)
    }
}

const DeleteArticle = async (articleId) => {
    try {
        await deleteDoc(doc(db, "articles", articleId));
        return "succes"
    } catch (err) {
        throw new Error("Something went wrong: " + err.message)
    }
}

export {GetAllArticles, PostArticle, DeleteArticle}