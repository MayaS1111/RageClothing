import {initializeApp} from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
prompt: "select_account",
});

export const auth = getAuth();
export const signInGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
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
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message)
        }
    
       
    } return userDocRef;
}
