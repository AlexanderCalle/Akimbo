import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../services/Authentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard/overview");
  }, [user, loading, error, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
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
            type="submit"
          >
            Login
          </button>
          <Link className="hover:underline text-akimbo-dark-500 font-thin">
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
