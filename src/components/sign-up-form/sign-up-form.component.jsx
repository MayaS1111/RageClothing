import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields= {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFields = () => {
        setFormFields(defaultFormFields)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password===confirmPassword){
            try{
                const {user} = await createAuthUserWithEmailAndPassword(email, password);
                await createUserDocumentFromAuth(user, {displayName});
                resetFields();
                console.log('new user created')

            }catch(error){
                if(error.code==='auth/email-already-in-use'){
                    alert('Can not create user, email already in use')
                }
                if(error.code==='auth/weak-password'){
                    alert('Can not create user, password too weak')
                }
                console.log('user creation encountered an error', error);
            }
            
        }else{
            alert("Passwords do not match");
            return;
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    return(
        <div>
            <h1>Sign up with your email or password</h1>
            <form onSubmit={()=>{}}>
                <label>Display Name</label>
                <input type='text' required onChange={handleChange} name='displayName' value={displayName}/>

                <label>Email</label>
                <input type='email' required onChange={handleChange} name='email' value={email}/>

                <label>Password</label>
                <input type='password' required onChange={handleChange} name='password' value={password}/>

                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <button type='submit' onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;