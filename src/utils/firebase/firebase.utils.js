import {initializeApp} from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDamx1QvMrGNv6SfWv9daz6d6x93xI5jLg",
    authDomain: "rage-clothing-db-d2298.firebaseapp.com",
    projectId: "rage-clothing-db-d2298",
    storageBucket: "rage-clothing-db-d2298.appspot.com",
    messagingSenderId: "333112972948",
    appId: "1:333112972948:web:4854e923cf9256c139c681"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectonKey, objectsToAdd) => {
    const collectionRef = collection(db, collectonKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc (collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments =  async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})

    return categoryMap;
}

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) =>{
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshop = await getDoc(userDocRef);
    console.log(userSnapshop);
    console.log(userSnapshop.exists());

    if(!userSnapshop.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
    
        try{
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additionalInformation,
            });
        } catch(error){
            console.log('error creating the user', error.message)
        }
    } return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth,callback)