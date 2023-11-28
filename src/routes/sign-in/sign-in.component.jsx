import {signInGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const {user} = await signInGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
    <div>
        <h1>Im The Sign In Page</h1>
        <button onClick={logGoogleUser}>
            Sign in with Google Popup
        </button>
    </div>
    );
};

export default SignIn;