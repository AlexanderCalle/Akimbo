import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth, db } from "./Firebase";
import { addDoc, collection } from "firebase/firestore";

const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
        console.error(err);
        alert(err.message);
    }
}

const register = async (firstname, lastname, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstname,
        lastname,
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!")
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const logout = () => {signOut(auth)}

export {logIn, register, sendPasswordReset, logout}