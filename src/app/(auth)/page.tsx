import React from 'react';
import AuthWrapper from './components/auth-wrapper';
import LoginForm from './components/login-form';

export default function Page() {
  return (
    <AuthWrapper title='Welcome Back!' subtitle='Log in to your account'>
      <LoginForm />
    </AuthWrapper>
  );
}
