import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";

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

export {GetAllArticles}