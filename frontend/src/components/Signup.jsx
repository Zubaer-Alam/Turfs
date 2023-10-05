import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await signup(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white border rounded-lg px-8 pt-6 pb-8 mb-4">
        <h3 className="text-2xl text-center mb-4 font-semibold">Sign Up</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 flex justify-left"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="flex justify-left block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
};
export default Signup;
