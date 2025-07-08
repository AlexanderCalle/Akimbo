
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "./Firebase"
import { Contributer } from "../utils/contributers";

const collection_name = "contributers"

export const getAllContributers = async () => {
  const querySnapshot = await getDocs(query(
    collection(db, collection_name),
    orderBy("name", "asc")
  ));
  const data = [];
  querySnapshot.forEach((doc) => {
    const contributer = { id: doc.id, ...doc.data() }
    data.push(new Contributer(contributer.id, contributer.name, contributer.description, contributer.link))
  });
  return data;
} 