require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, writeBatch } = require('firebase/firestore');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

/**
 * Generates a URL-friendly slug from an article title
 * @param {string} title - The article title
 * @returns {string} - The generated slug
 */
const generateSlug = (title) => {
  if (!title || typeof title !== 'string') {
    return '';
  }
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Main function to add slug fields to all articles
 */
const addSlugFields = async () => {
  try {
    console.log('🚀 Starting slug field migration...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('📡 Connected to Firebase');
    
    // Get all articles
    const articlesRef = collection(db, 'articles');
    const snapshot = await getDocs(articlesRef);
    
    console.log(`📄 Found ${snapshot.docs.length} articles to process`);
    
    if (snapshot.empty) {
      console.log('✅ No articles found. Migration complete.');
      return;
    }
    
    const batch = writeBatch(db);
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const batchSize = 500; // Firestore batch limit
    
    for (const docSnapshot of snapshot.docs) {
      try {
        const docData = docSnapshot.data();
        const docId = docSnapshot.id;
        
        // Skip if slug already exists
        if (docData.slug) {
          console.log(`⏭️  Skipping article "${docData.title}" - slug already exists`);
          skippedCount++;
          continue;
        }
        
        // Generate slug from title
        const slug = generateSlug(docData.title);
        
        if (!slug) {
          console.log(`⚠️  Warning: Could not generate slug for article "${docData.title}" (ID: ${docId})`);
          errorCount++;
          continue;
        }
        
        // Add to batch
        const docRef = doc(db, 'articles', docId);
        batch.update(docRef, { slug });
        
        console.log(`✅ Generated slug "${slug}" for article "${docData.title}"`);
        processedCount++;
        
        // Execute batch if it reaches the limit
        if (processedCount % batchSize === 0) {
          await batch.commit();
          console.log(`💾 Committed batch of ${batchSize} updates`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing article ${docSnapshot.id}:`, error.message);
        errorCount++;
      }
    }
    
    // Commit remaining updates
    if (processedCount % batchSize !== 0) {
      await batch.commit();
      console.log(`💾 Committed final batch of ${processedCount % batchSize} updates`);
    }
    
    // Summary
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully processed: ${processedCount} articles`);
    console.log(`⏭️  Skipped (already had slug): ${skippedCount} articles`);
    console.log(`❌ Errors: ${errorCount} articles`);
    console.log(`📄 Total articles: ${snapshot.docs.length}`);
    
    if (errorCount === 0) {
      console.log('\n🎉 Migration completed successfully!');
    } else {
      console.log(`\n⚠️  Migration completed with ${errorCount} errors. Please review the logs above.`);
    }
    
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }
};

// Run the migration
addSlugFields()
  .then(() => {
    console.log('🏁 Script execution completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script execution failed:', error);
    process.exit(1);
  });
