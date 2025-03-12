// app/login/page.js
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-8">
        <h2 className="mb-6 text-center">Login to Continue</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;