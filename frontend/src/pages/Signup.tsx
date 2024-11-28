import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Bot } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CustomInput from '../components/shared/CustomInput';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      toast.loading('Creating account...', { id: 'signup' });
      await auth.signup(name, email, password);
      toast.success('Account created successfully', { id: 'signup' });
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create account', { id: 'signup' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Bot className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <CustomInput
              type="text"
              name="name"
              label="Full name"
              required
              autoComplete="name"
            />
            <CustomInput
              type="email"
              name="email"
              label="Email address"
              required
              autoComplete="email"
            />
            <CustomInput
              type="password"
              name="password"
              label="Password"
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              </span>
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;