import { useState } from 'react';
import { toast } from 'react-toastify';
import { userLogin } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }
    if (!password) {
      toast.error('Password is required');
      return;
    }

    try {
      const response = await userLogin(email, password);
      localStorage.setItem('access_token', response.data.token);
      toast.success('Login successful', {
        autoClose: 1500,
        onClose: () => navigate('/task'),
      });
    } catch (error) {
      toast.error('Check your email and password');
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">Who's this</p>
      <div className="mt-8">
        <div className="text-lg font-medium">
          <label>Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2  mt-1"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-lg font-medium">
          <label>Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2  mt-1"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-between">
          <div>
            <input type="checkbox" id="remember" />
            <label for="remember" className="ml-2 font-medium text-base">
              Remember me
            </label>
          </div>

          <button className="font-medium text-base">Forgot password</button>
        </div>

        <div className="mt-8 flex flex-col gay-y-4">
          <button
            onClick={() => handleLogin()}
            className="hover:scale-[1.01] ease-in-out active:scale-[.98] transition-all bg-violet-500 text-white text-lg font-bold py-2 rounded-xl mb-2"
          >
            Sign in
          </button>
          <button className="flex justify-center mt-2 items-center border-2 border-gray-200 p-2 rounded-lg hover:scale-[1.01] ease-in-out active:scale-[.98] transition-all gap-2">
            <svg
              width="24"
              height="24"
              viewBox="-3 0 262 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
