import { SignUpModal } from './SignUpModal';

const SignUpPage = () => {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-md mx-auto bg-[#1a2234] rounded-lg p-6">
        <SignUpModal />
      </div>
    </div>
  );
};

export default SignUpPage;