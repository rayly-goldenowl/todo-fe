import FormLogin from './FormLogin';
const Login = (props) => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <FormLogin />
      </div>

      <div className="w-1/2 hidden lg:flex h-full bg-gray-100 items-center justify-center">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"></div>
        <div className="h-1/2 absolute backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default Login;
