import { DocumentReference, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { GetAuthor } from "./Users";

const GetAllArticles = async () => {
    const data = [];
    
    const qeurySnapshot = await getDocs(collection(db, "articles"));

    qeurySnapshot.forEach(async (doc) => {
        const docData = doc.data();
        let article = {id: doc.id, ...docData}

        if(docData.author instanceof DocumentReference) {
            const refDoc = await getDoc(docData.author);
            article.author = refDoc.data();
        }

         //BUG problem waiting an data
        data.push(article)
    })
    return data;
}

export {GetAllArticles}