import { Timestamp, addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getTag } from "./Tags";

const GetTagsArticle = async (article) => {
    let tags = article.tags.map(async (tag) => {
        let tagResult = await getTag(tag);
        return tagResult;
    });

    tags = await Promise.all(tags)

    return tags;
}

const getDocData = async (querySnap) => {
    try {
        let data = querySnap.docs.map(async (doc) => {
            const docData = doc.data();
            let article = {id: doc.id, ...docData}
            article.tags = await GetTagsArticle(article);
            return article
        });
        
        data = await Promise.all(data);
        return data
    } catch (error) {
        throw new Error("get docs", error)
    }
}

const GetAllArticles = async () => {    
    const qeurySnapshot = await getDocs(collection(db, "articles"));

    const data = await getDocData(qeurySnapshot);

    return data;
}

const GetArticleWithId = async (articleId) => {
    const docRef = doc(db, "articles", articleId);
    const snapshot = await getDoc(docRef);
    const docData = snapshot.data();

    let article = {id: doc.id, ...docData}
    article.tags = await GetTagsArticle(article);
    
    return article
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

const UpdateArticle = async ({title, content, description, author, cat, tags, image, imageTitle, imageAuthor, docId}) => {
    try {
        
        let data = {
            title,
            content,
            description,
            author,
            cat,
            tags,
            imageTitle,
            imageAuthor,
        }
        if(image != null) {
            const storageRef = ref(storage, "articlesImages/" + image.name)
            const snapshot = await uploadBytes(storageRef, image)
            data = {...data, image: await getDownloadURL(snapshot.ref)}
        }
        
        await updateDoc(doc(db, "articles", docId), data)
    
    } catch(err) {
        console.log(err);
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

const GetMostRecentPosts = async () => {
    try {
        const qeurySnapshot = await getDocs(collection(db, "articles"));
        const data = await getDocData(qeurySnapshot);
        return data.sort((a, b) => (a.created_date > b.created_date) ? -1 : 1).slice(0, 3) 
    } catch(err) {
        throw new Error("Something went wrong fetching data.")
    }
}

const GetAllPostsFromCat = async (category) => {
    try {
        let data = [];
        const qeurySnapshot = await getDocs(collection(db, "articles"));
    
        // await qeurySnapshot.forEach(async (doc) => {
        //     const docData = doc.data();
        //     let article = {id: doc.id, ...docData}
        //     article.tags = await GetTagsArticle(article);
        //     data.push(article) // BUG: push to array doesn't work
        // });

        data = await getDocData(qeurySnapshot);

        return data.filter(article => article.cat === category).sort((a, b) => (a.created_date > b.created_date) ? -1 : 1).slice(0, 3)
     } catch(err) {
        console.log(err);
         throw new Error("Something went wrong fetching data.")
     }
}

export {GetAllArticles, GetArticleWithId, PostArticle, UpdateArticle, DeleteArticle, GetMostRecentPosts, GetAllPostsFromCat}