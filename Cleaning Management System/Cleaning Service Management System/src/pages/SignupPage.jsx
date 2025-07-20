import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignupPage = () => {
  const [name, setName] = useState(''); //  Added name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), //  Send name
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      alert('Account created successfully, please login.');
      navigate('/login');
    } catch (err) {
      setError('Network error, please try again later');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-primary text-white">
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-light/80">Join our cleaning service today</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/*  Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-accent focus:ring-1 focus:ring-accent text-white placeholder-white/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-accent focus:ring-1 focus:ring-accent text-white placeholder-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="•••••••• (min 6 characters)"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-accent focus:ring-1 focus:ring-accent text-white placeholder-white/50 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-white/50 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm font-medium text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:text-white font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
