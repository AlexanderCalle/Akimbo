import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../services/Authentication";
import { auth } from "../services/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard/overview");
  }, [user, loading, error, navigate]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="bg-[#fff] p-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl">Login</h2>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            logIn(email, password);
          }}
        >
          <input
            className="p-2 w-60 border border-solid border-akimbo-dark-900"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <input
            className="p-2 w-60 border border-solid border-akimbo-dark-900"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
          <button
            className="px-3 py-1 bg-akimbo-dark-900 text-akimbo-light"
            type="submit"
          >
            Login
          </button>
          <Link className="font-thin hover:underline text-akimbo-dark-500">
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
