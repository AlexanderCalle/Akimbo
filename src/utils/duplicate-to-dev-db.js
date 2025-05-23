import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/Firebase";

export const DuplicateCollectionToDev = async (collectionName) => {
  try {
      // Get all articles from production collection
      const prodCollection = collection(db, collectionName);
      const prodSnapshot = await getDocs(prodCollection);
      
      // Create dev collection reference
      const devCollection = collection(db, `${collectionName}_dev`);
      
      // Process each document
      const duplicatePromises = prodSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          // Create new document in dev collection with same data
          await addDoc(devCollection, data);
      });
      
      await Promise.all(duplicatePromises);
      return { success: true, message: 'Collection duplicated successfully' };
  } catch (error) {
      console.error('Error duplicating collection:', error);
      throw new Error('Failed to duplicate collection: ' + error.message);
  }
}