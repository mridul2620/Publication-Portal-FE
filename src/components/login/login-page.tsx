import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [loginError, setLoginError] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        break;
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        break;
      default:
        return undefined;
    }
    return undefined;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors] && touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    newErrors.username = validateField('username', formData.username);
    newErrors.password = validateField('password', formData.password);
    
    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors];
      }
    });
    
    setErrors(newErrors);
    setTouched({ username: true, password: true });

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setLoginError('');
      
      try {
        const response = await axios.post('http://localhost:3001/api/login', {
          username: formData.username,
          password: formData.password
        });
        
        if (response.status === 200) {
          // Store token if provided
          if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
          }
          // Navigate to homepage
          window.location.href = '/home-page';
        }
      } catch (error) {
        console.error('Login failed:', error);
        if (axios.isAxiosError(error)) {
          setLoginError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        } else {
          setLoginError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Get input styling based on validation state
  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full pl-12 pr-4 py-4 text-base border-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 bg-white/90 backdrop-blur-sm";
    const hasError = errors[fieldName as keyof FormErrors] && touched[fieldName];
    const isValid = touched[fieldName] && !errors[fieldName as keyof FormErrors] && formData[fieldName as keyof FormData];
    
    if (hasError) {
      return `${baseClass} border-red-400 focus:border-red-500 text-red-900 placeholder-red-400`;
    } else if (isValid) {
      return `${baseClass} border-green-400 focus:border-green-500 text-gray-900`;
    }
    return `${baseClass} border-gray-300 focus:border-blue-500 text-gray-900 hover:border-gray-400`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-lg rotate-12 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="relative z-10 text-center max-w-md">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-2xl border border-white/20 p-3">
                  <img src="/logo.png" alt="Chartsign Logo" className="w-full h-full object-contain" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Company Name */}
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Chartsign
            </h1>
            
            {/* Tagline */}
            <p className="text-xl text-blue-100 mb-8 font-light">
              Chartsign Industry Publication Portal
            </p>
            
            {/* Features */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>Industry-leading insights</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>Comprehensive database</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>Professional publication tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-2">
                <img src="/logo.png" alt="Chartsign Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chartsign</h1>
              <p className="text-gray-600">Welcome back</p>
            </div>

            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/50 p-8 transform transition-all duration-300 hover:shadow-3xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="hidden lg:block">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to access your account</p>
                </div>
              </div>

              {/* Login Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Login Error Message */}
                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-red-700">{loginError}</p>
                    </div>
                  </div>
                )}

                {/* Username Field */}
                <div className="relative group">
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Mail className={`w-5 h-5 transition-colors duration-200 ${
                        errors.username && touched.username ? 'text-red-500' : 
                        touched.username && !errors.username && formData.username ? 'text-green-500' : 
                        'text-gray-400 group-hover:text-blue-500'
                      }`} />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={getInputClassName('username')}
                      placeholder="Enter your username"
                      aria-describedby={errors.username ? "username-error" : undefined}
                      autoComplete="username"
                    />
                    {touched.username && !errors.username && formData.username && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.username && touched.username && (
                    <p id="username-error" className="mt-2 text-sm text-red-600 flex items-center animate-fadeIn">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Lock className={`w-5 h-5 transition-colors duration-200 ${
                        errors.password && touched.password ? 'text-red-500' : 
                        touched.password && !errors.password && formData.password ? 'text-green-500' : 
                        'text-gray-400 group-hover:text-blue-500'
                      }`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={getInputClassName('password')}
                      placeholder="Enter your password"
                      aria-describedby={errors.password ? "password-error" : undefined}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p id="password-error" className="mt-2 text-sm text-red-600 flex items-center animate-fadeIn">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
                    />
                    <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/forgot-password';
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-base shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sign In</span>
                      <div className="transform transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </div>
                    </div>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a
                    href="#signup"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                  >
                    Contact Administrator
                  </a>
                </p>
                
                {/* Copyright Notice */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">
                    Copyright © 2019-2025 Chartsign Ltd
                  </p>
                  <p className="text-xs text-gray-500">
                    Entry to this site is restricted to employees and affiliates of Chartsign Limited
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;