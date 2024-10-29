import { Suspense } from 'react';
import AuthWrapper from '../components/auth-wrapper';
import ResetPasswordForm from '../components/reset-password-form';

export default function Page() {
  return (
    <AuthWrapper
      title='Enter your new password'
      subtitle='Password must be 8 characters minimum, must contain one number minimum, one lowercase character and one uppercase character.'
    >
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthWrapper>
  );
}
