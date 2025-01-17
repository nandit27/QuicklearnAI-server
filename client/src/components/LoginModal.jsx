import React, { useState } from 'react';
import Dialog from './Dialog';
import { Tabs, TabsList, TabTrigger, TabContent } from './Tabs';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

const LoginModalContent = ({ isOpen, onClose, onSignUpClick }) => {
  const [activeTab, setActiveTab] = useState('student');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:3000/user/auth",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  const googleAuth = async (code) => {
    try {
      const response = await api.get(`/google?code=${code}`);
      return response;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        console.log("Google Login Code:", authResult);
        const result = await googleAuth(authResult.code);
        console.log('Google Login Result:', result);
        
        if (result.data && result.data.user) {
          const { email, username, avatar } = result.data.user;
          const token = result.data.token;
          const obj = { email, username, token, avatar };
          
          localStorage.setItem('user-info', JSON.stringify(obj));
          onClose();
          navigate('/dashboard');
        }
      } else {
        throw new Error('No authorization code present');
      }
    } catch (e) {
      console.error('Error during Google Login:', e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
    flow: "auth-code",
    popup: true, // Enable popup mode
    ux_mode: "popup", // Explicitly set UX mode to popup
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      {/* Rest of your dialog content */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Welcome to QuickLearnAI
        </h2>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabTrigger value="student" selected={activeTab === 'student'} onClick={() => setActiveTab('student')}>
            Student
          </TabTrigger>
          <TabTrigger value="teacher" selected={activeTab === 'teacher'} onClick={() => setActiveTab('teacher')}>
            Teacher
          </TabTrigger>
        </TabsList>

        <TabContent value="student" selected={activeTab === 'student'}>
          <form className="space-y-4">
            {/* Email and Password fields */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="student@example.com"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-colors"
            >
              Login as Student
            </button>
            
            {/* Google Login Button */}
            <div className="text-center">
              <button
                onClick={ googleLogin}
                type="button"
                className="w-full py-2 px-4 bg-white text-gray-800 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  onSignUpClick();
                }}
                className="text-purple-400 hover:text-purple-300"
              >
                Sign up
              </button>
            </div>
          </form>
        </TabContent>

        {/* Teacher tab with similar content */}
        <TabContent value="teacher" selected={activeTab === 'teacher'}>
          {/* Similar form content as student tab */}
          {/* ... */}
        </TabContent>
      </Tabs>
    </Dialog>
  );
};

// Wrapper component that provides Google OAuth context
const LoginModal = (props) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LoginModalContent {...props} />
    </GoogleOAuthProvider>
  );
};

export default LoginModal;