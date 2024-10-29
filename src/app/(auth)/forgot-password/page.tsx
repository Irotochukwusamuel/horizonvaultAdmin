import AuthWrapper from '../components/auth-wrapper';
import ForgotPasswordForm from '../components/forgot-password-form';

export default function Page() {
  return (
    <AuthWrapper
      title='Reset your password'
      subtitle="Enter your email address, and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
