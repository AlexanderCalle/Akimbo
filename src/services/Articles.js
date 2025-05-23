import { Timestamp, addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, query, where, orderBy, limit, or, and } from "firebase/firestore";
import { db, storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getTag } from "./Tags";

const collection_name = "articles";

const GetTagsArticle = async (article) => {
    let tags = article.tags.map(async (tag) => {
        let tagResult = await getTag(tag);
        return tagResult;
    });

    tags = await Promise.all(tags)

    return tags;
}

export const getDocData = async (querySnap) => {
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
    try{
        const qeurySnapshot = await getDocs(query(collection(db, collection_name), orderBy("isPublished", "asc"), orderBy("created_date", "desc")));

        const data = await getDocData(qeurySnapshot);

        return data;
    } catch(error) {
        console.log(error);
        throw new Error(error)
    }
}

const GetPlannedArticles = async () => {
    try {
        const qeurySnapshot = await getDocs(
            query(
                collection(db, collection_name),
                or(
                    where("start_date", ">", Timestamp.now()),
                    where("isPublished", "==", false)
                ),
                orderBy("start_date", "asc"),
                orderBy("created_date", "asc")
            )
        )

        return await getDocData(qeurySnapshot);
    } catch(err) {
        throw new Error(err);
    }
}

const GetArticleWithId = async (articleId) => {
    const docRef = doc(db, collection_name, articleId);
    const snapshot = await getDoc(docRef);
    const docData = snapshot.data();

    let article = {id: doc.id, ...docData}
    article.tags = await GetTagsArticle(article);
    
    return article
}

const GetArticleWithIdUpdate = async (articleId) => {
    const docRef = doc(db, collection_name, articleId);
    const snapshot = await getDoc(docRef);
    const docData = snapshot.data();

    let tags = []

    docData.tags.forEach(async tag => {
        tags.push(getTag(tag))
    });

    let article = {id: doc.id, ...docData}
    article.tags = Promise.all(tags)
    return article
}

const PostArticle = async ({title, content, description, author, cat, tags, image, imageTitle, imageAuthor, isPublished, start_date}) => {
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
            created_date,
            isPublished,
            start_date: start_date ?? t.toDate()
        }

        const docRef  = await addDoc(collection(db, collection_name), data)
        
        return docRef.id
    
    } catch(err) {
        throw new Error(`Something went wrong uploading file: ${err.message}`)
    }
}

const UpdateArticle = async ({title, content, description, author, cat, tags, image, imageTitle, imageAuthor, isPublished, start_date, docId}) => {
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
            isPublished,
            start_date
        }
        if(image != null) {
            const storageRef = ref(storage, "articlesImages/" + image.name)
            const snapshot = await uploadBytes(storageRef, image)
            data = {...data, image: await getDownloadURL(snapshot.ref)}
        }
        
        await updateDoc(doc(db, collection_name, docId), data)
    
    } catch(err) {
        console.log(err);
        throw new Error(`Something went wrong uploading file: ${err.message}`)
    }
}

const UpdatePublishStateArticle = async ({ docId, isPublished }) => {
    try {
        await updateDoc(doc(db, collection_name, docId), {
            isPublished
        })
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong updating article with id ${docId}`)
    }
}

const DeleteArticle = async (articleId) => {
  try {
      await deleteDoc(doc(db, collection_name, articleId));
      return "succes"
  } catch (err) {
      throw new Error("Something went wrong: " + err.message)
  }
}

const GetMostRecentPosts = async () => {
    try {
        const qeurySnapshot = await getDocs(query(
            collection(db, collection_name), 
            and(
                where("isPublished", "==", true),
                or(
                    where("start_date" , "<=", Timestamp.now()),
                    where("start_date", "==", null)
                ),
            ),
            orderBy("start_date", "desc"),
            orderBy("created_date", "desc"),
            limit(3)
        ));
        const data = await getDocData(qeurySnapshot);
        return data;
    } catch(err) {
        console.log(err);

        throw new Error("Something went wrong fetching data.")
    }
}

const GetAllPostsFromCat = async (category) => {
    try {
        let data = [];
        const qeurySnapshot = await getDocs(
            query(
                collection(db, collection_name), 
                and(
                    where("cat", "==", category),
                    where("isPublished", "==", true),
                    or(
                        where("start_date", "<=", Timestamp.now()),
                        where("start_date", "==", null)
                    ),
                ),
                orderBy("start_date", "desc"),
                orderBy("created_date", "desc"),
            )
        );

        data = await getDocData(qeurySnapshot);

        console.log(data)

        data = data.sort( (a, b) => b.created_date - a.created_date )

        return data;
     } catch(err) {
        console.log(err);
        throw new Error("Something went wrong fetching data.")
     }
}

export {
    GetAllArticles, 
    GetPlannedArticles,
    GetArticleWithId, 
    PostArticle, 
    UpdateArticle, 
    UpdatePublishStateArticle,
    DeleteArticle, 
    GetMostRecentPosts, 
    GetAllPostsFromCat, 
    GetArticleWithIdUpdate
}