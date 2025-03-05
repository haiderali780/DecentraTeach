import React, {useState, useEffect} from 'react';

const LoginSign = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('learner'); // Default role
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleTab = () => {
    setIsLogin(!isLogin);
    clearForm();
  };

  const clearForm = () => {
    setLoginEmail('');
    setLoginPassword('');
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupRole('learner');
    setErrors({});
    setBackendError('');
    setSuccessMessage('');
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginEmail) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) newErrors.email = 'Email format is invalid';
    if (!loginPassword) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupUsername) newErrors.username = 'Username is required';
    if (!signupEmail) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupEmail)) newErrors.email = 'Email format is invalid';
    if (!signupPassword) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async e => {
    e.preventDefault();
    if (validateLogin()) {
      // Simulate backend response
      const isValidUser = loginEmail === 'test@example.com' && loginPassword === 'password';
      if (!isValidUser) {
        setBackendError('Invalid credentials. Please try again.');
      } else {
        console.log('Login successful');
      }
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    if (validateSignup()) {
      // Simulate backend response
      setSuccessMessage('Account created successfully!');
      console.log('Signup:', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
      });
    }
  };

  // Enable button based on validation
  const isLoginButtonDisabled = !loginEmail || !loginPassword || !/\S+@\S+\.\S+/.test(loginEmail);
  const isSignupButtonDisabled =
    !signupUsername || !signupEmail || !signupPassword || !/\S+@\S+\.\S+/.test(signupEmail);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md'>
        <div className='flex mb-4'>
          <button
            onClick={toggleTab}
            className={`w-1/2 py-2 font-semibold text-lg transition-all duration-200 ${
              isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={toggleTab}
            className={`w-1/2 py-2 font-semibold text-lg transition-all duration-200 ${
              !isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>

        {backendError && <p className='text-red-400 text-sm mb-4'>{backendError}</p>}
        {successMessage && <p className='text-green-400 text-sm mb-4'>{successMessage}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='block text-gray-300'>Email</label>
              <input
                type='email'
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className={`mt-1 block w-full border rounded-md p-2 transition duration-200 ease-in-out ${
                  errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                }`}
                required
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300'>Password</label>
              <input
                type='password'
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className={`mt-1 block w-full border rounded-md p-2 transition duration-200 ease-in-out ${
                  errors.password ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                }`}
                required
              />
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
            </div>
            <button
              type='submit'
              disabled={isLoginButtonDisabled}
              className={`w-full py-2 rounded-md transition duration-200 ${
                isLoginButtonDisabled
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className='mb-4'>
              <label className='block text-gray-300'>Username</label>
              <input
                type='text'
                value={signupUsername}
                onChange={e => setSignupUsername(e.target.value)}
                className={`mt-1 block w-full border rounded-md p-2 transition duration-200 ease-in-out ${
                  errors.username ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                }`}
                required
              />
              {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300'>Email</label>
              <input
                type='email'
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                className={`mt-1 block w-full border rounded-md p-2 transition duration-200 ease-in-out ${
                  errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                }`}
                required
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300'>Password</label>
              <input
                type='password'
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                className={`mt-1 block w-full border rounded-md p-2 transition duration-200 ease-in-out ${
                  errors.password ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                }`}
                required
              />
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300'>Sign up as:</label>
              <div className='flex items-center'>
                <input
                  type='radio'
                  value='learner'
                  checked={signupRole === 'learner'}
                  onChange={e => setSignupRole(e.target.value)}
                  className='mr-2'
                />
                <label className='mr-4'>Learner</label>
                <input
                  type='radio'
                  value='instructor'
                  checked={signupRole === 'instructor'}
                  onChange={e => setSignupRole(e.target.value)}
                  className='mr-2'
                />
                <label>Instructor</label>
              </div>
            </div>
            <button
              type='submit'
              disabled={isSignupButtonDisabled}
              className={`w-full py-2 rounded-md transition duration-200 ${
                isSignupButtonDisabled
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSign;
