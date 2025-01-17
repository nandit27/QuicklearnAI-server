import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import Dialog from './Dialog';
import { Tabs, TabsList, TabTrigger, TabContent } from './Tabs';

export const SignUpModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [activeTab, setActiveTab] = useState('student');
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Create Your Account
        </h2>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabTrigger value="student" selected={activeTab === 'student'} onClick={setActiveTab}>
            Student
          </TabTrigger>
          <TabTrigger value="teacher" selected={activeTab === 'teacher'} onClick={setActiveTab}>
            Teacher
          </TabTrigger>
        </TabsList>

        <TabContent value="student" selected={activeTab === 'student'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Student Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="1234567890"
                pattern="[0-9]{10}"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="student@example.com"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-colors"
            >
              Sign Up as Student
            </button>
          </form>
        </TabContent>

        <TabContent value="teacher" selected={activeTab === 'teacher'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Teacher Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Dr. Jane Smith"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Teacher Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="teacher@example.com"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Teacher Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="1234567890"
                pattern="[0-9]{10}"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Highest Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Highest Qualification
              </label>
              <select
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              >
                <option value="">Select Qualification</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Certificate Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Certificate
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="certificate"
                  required
                />
                <label
                  htmlFor="certificate"
                  className="flex items-center gap-2 w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">
                    {fileName || 'Upload Certificate (PDF, JPG, PNG)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Teaching Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Teaching Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                placeholder="5"
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Preferred Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Preferred Subject
              </label>
              <select
                className="w-full px-4 py-2 bg-[#1a2234] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                required
              >
                <option value="">Select Subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="computer_science">Computer Science</option>
                <option value="english">English</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-colors"
            >
              Sign Up as Teacher
            </button>
          </form>
        </TabContent>
      </Tabs>
      <div className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-purple-400 hover:text-purple-300"
        >
          Log in
        </button>
      </div>
    </Dialog>
  );
};

export default SignUpModal;