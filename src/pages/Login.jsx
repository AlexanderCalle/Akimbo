import React, { useEffect, useState } from "react";
import { auth } from "../services/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { logIn } from "../services/Authentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // if (loading) {
    //   return (
    //     <p className="flex items-center justify-center text-2xl">Loading...</p>
    //   );
    // }
    // if (error) return <p>Something went wrong, refresh and try again</p>;
    if (user) navigate("/dashboard/overview");
  }, [user, loading, error, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="bg-[#fff] p-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl">Login</h2>
        <div className="flex flex-col gap-3">
          <input
            className="w-60 border border-solid border-akimbo-dark-900 p-2"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <input
            className="w-60 border border-solid border-akimbo-dark-900 p-2"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
          <button
            className="bg-akimbo-dark-900 text-akimbo-light px-3 py-1"
            onClick={() => logIn(email, password)}
          >
            Login
          </button>
          <Link className="hover:underline text-akimbo-dark-500 font-thin">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
