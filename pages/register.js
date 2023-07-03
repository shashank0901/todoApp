//in this file, i have created the register form :- Name, Email, Password, Signup button, login with Google button, and if already have an account then a login option.

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";

const Provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { authUser, isLoading, setAuthUser } = useAuth();

  const router = useRouter();

  //here we are creating secure login kind of thing, that is, if the user has not registered in, then he can't go to the login page, and if the user has already logged in, then it should always go to the home page of the todo app.

  useEffect(() => {
    // means the user is registered
    if (!isLoading && authUser) {
      router.push("/"); //send the user to home page always if he is logged in.
    }
  }, [authUser, isLoading]);
  // in the dependencies array, i have passed authUser and isLoading, which means if any of these 2 changes, then useEffect should be called.

  const signupHandler = async () => {
    if (!email || !username || !password) return;

    try {
      // this createUser....password need 3 params, (auth, email and password)
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //   this createuserwithidpassword doesnot have any param for name, so for that we have used updateProfile library
      // using this updateProfile library, we can make an object, and write any field that you want to update. just rem that it takes auth.currentUser as params, it should be written like this basically

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      setAuthUser({
        uid: user.uid,
        email: user.email,
        username,
        // we can also write it like this
        // username,
        // no colon and anything
      });
      // on doing console.log(user), i get all the properties of the user. where one such property is displayName
      //   which initially shows null, so i used this updateProfile to update the displayName
      console.log(user);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const signInWithGoogle = async () => {
    // this signinwithpopup takes 2 params, auth and Provider
    try {
      const user = await signInWithPopup(auth, Provider);
      console.log(user);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-6xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account ?{" "}
            <Link
              href="/login"
              className="underline hover:text-blue-400 cursor-pointer"
            >
              Login
            </Link>
          </p>

          <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group">
            <FcGoogle size={22} />
            <span
              className="font-medium text-black group-hover:text-white"
              onClick={signInWithGoogle}
            >
              Login with Google
            </span>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Name</label>
              <input
                type="text"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Email</label>
              <input
                type="email"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
              onClick={signupHandler}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
        style={{
          backgroundImage: "url('/login-banner.jpg')",
        }}
      ></div>
    </main>
  );
};

export default RegisterForm;
