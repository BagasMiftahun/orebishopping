import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { logoLight } from "../../assets/images";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
      return;
    }
    if (!password) {
      setErrPassword("Create a password");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/"); // Redirect setelah login
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">Stay sign in for more</h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          {[...Array(3)].map((_, index) => (
            <div className="w-[300px] flex items-start gap-3" key={index}>
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  {`Feature ${index + 1}`}
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">© OREBI</p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">Terms</p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">Privacy</p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">Security</p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center" onSubmit={handleSignIn}>
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">Sign in</h1>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">Work Email</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errEmail && <p className="text-sm text-red-500 font-titleFont font-semibold">{errEmail}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
                {errPassword && <p className="text-sm text-red-500 font-titleFont font-semibold">{errPassword}</p>}
              </div>

              <button
                type="submit"
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Sign In
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">Sign up</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
