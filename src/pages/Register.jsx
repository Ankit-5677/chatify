import React, { useState } from 'react';
import '../App.css';
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            // This line attempts to create a new user with the email and password provided in the form using Firebase authentication.

            const storageRef = ref(storage, displayName);
            // This creates a reference to the storage location for the user's avatar image using the user's display name.

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setErr(true);
                    console.error('Upload failed:', error);
                },
                async () => {
                    // Handle successful uploads on complete
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);//This retrieves the downloadable URL for the uploaded image using getDownloadURL
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, 'users', res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {})
                    navigate("/");
                }   
            );
        } catch (err) {
            setErr(true);
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Chatify</span>
                <span className="title">Register</span>
                <form id="myform" onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" className="inputfield" />
                    <input type="email" placeholder="email" className="inputfield" />
                    <input type="password" placeholder="password" className="inputfield" />
                    <input type="file" style={{ display: 'none' }} id="fil" />
                    <label htmlFor="fil" className="img">
                        <img src={Add} alt="avatar" className="image" />
                        <span className="text">Add an avatar</span>
                    </label>
                    <button className="mybtn">Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/login" className="login">Login</Link>
                </p>
            </div>
        </div>
    );
}


// by keeping id and htmlFor of input type="file" and label same, they both perform same function.
