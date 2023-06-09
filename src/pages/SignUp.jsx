import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // redirect the user after sign up to the home page
  const navigate = useNavigate();

  //for frontend password showing with the eye button
  const [showPassword, setShowPassword] = useState(false);

  // Destructure the email and password form formData
  const { name, email, password } = formData;

  //This function is for whatever the user is giving at the email value

  function onchange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  // submitting the form
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //updating the display name from name above formData variable

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //getting the user credentials

      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;

      //getting the server timestamp

      formDataCopy.timestamp = serverTimestamp();

      //adding the person to the database

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success("Signup is successfull");

      //navigate to the home page

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="name"
              id="name"
              value={name}
              placeholder="Full Name"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              onChange={onchange}
            />
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email Address"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              onChange={onchange}
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                onChange={onchange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Have an account ?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition
                duration-200 ease-in-out ml-1"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-700 transition
                duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Sign Up
            </button>
            <div className="my-4 items-center before:border-t flex before:flex-1  before:border-gray-300  after:border-t  after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
