import { useState } from 'react';
import { toast } from 'react-toastify';
import { userLogin, userSignup } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const FormAuth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }
    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (!isSignIn && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      if (isSignIn) {
        const response = await userLogin(email, password);
        localStorage.setItem('access_token', response.data.token);
        // toast.success('Login successful', {});
        setTimeout(function () {
          navigate('/task');
        }, 50);
      } else {
        await userSignup(email, password, confirmPassword);
        toast.success('Sign up successful! Please log in.');
        setIsSignIn(true);
      }
    } catch (error) {
      toast.error(
        isSignIn
          ? 'Check your email and password'
          : error.response.data.messages[0]
      );
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">
        {isSignIn ? 'Welcome Back' : 'Create an Account'}
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        {isSignIn ? "Who's this" : 'Join us to get started'}
      </p>
      <div className="mt-8">
        <div className="text-lg font-medium">
          <label>Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-lg font-medium">
          <label>Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isSignIn && (
          <div className="text-lg font-medium">
            <label>Confirm Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1"
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {isSignIn && (
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2 font-medium text-base">
                Remember me
              </label>
            </div>
          )}

          <button className="font-medium text-base">
            {isSignIn ? 'Forgot password' : ''}
          </button>
        </div>

        <div className="mt-8 flex flex-col gay-y-4">
          <button
            onClick={() => handleAuth()}
            className="hover:scale-[1.01] ease-in-out active:scale-[.98] transition-all bg-violet-500 text-white text-lg font-bold py-2 rounded-xl mb-2"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-center font-medium text-base mt-4"
          >
            {isSignIn
              ? 'Don’t have an account? Sign up'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAuth;
