'use client'
import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { signupSchema } from '@/validations/schemas';


type SignupFormValues = z.infer<typeof signupSchema>;


type FormErrors = Partial<Record<keyof SignupFormValues, string>>;

const validate = (values: SignupFormValues): FormErrors => {
  try {
    signupSchema.parse(values);
    return {};
  } catch (error) {
    const errors: FormErrors = {};
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        const field = err.path[0] as keyof SignupFormValues;
        if (field) {
          errors[field] = err.message;
        }
      });
    }
    return errors;
  }
};


const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};


interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const strength = getPasswordStrength(password);
  
  const getStrengthColor = (index: number): string => {
    if (strength < index) return 'bg-base-700';
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex h-5 justify-between px-1">
      <div className="my-auto flex gap-1.5">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index + 1}
            className={`h-1.5 w-8 rounded-sm ${getStrengthColor(index + 1)}`}
          />
        ))}
      </div>
    </div>
  );
};

interface PasswordFieldProps {
  name: keyof SignupFormValues;
  placeholder: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  hasError: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  placeholder,
  showPassword,
  onToggleVisibility,
  hasError
}) => (
  <div className={`bg-foreground flex h-12 justify-between rounded-xl border-2 border-solid ${
    hasError 
      ? 'border-red-500 focus-within:border-red-500' 
      : 'border-base-border-light focus-within:border-accent-blue'
  }`}>
    <Field
      name={name}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      className="bg-foreground text-high-emphasis placeholder-low-emphasis rounded-xl border-0 pl-4 text-base ring-0 outline-hidden focus:ring-0 w-full"
    />
    <button
      type="button"
      onClick={onToggleVisibility}
      className="bg-transparent mr-3"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5 text-base-icon" />
      ) : (
        <Eye className="h-5 w-5 text-base-icon" />
      )}
    </button>
  </div>
);


export const CreateAccountForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showReferral, setShowReferral] = useState<boolean>(false);

  const initialValues: SignupFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
    referral: ''
  };

  const handleSubmit = async (
    values: SignupFormValues, 
    { setSubmitting }: FormikHelpers<SignupFormValues>
  ): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', values);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldError = (
    errors: FormErrors, 
    touched: Partial<Record<keyof SignupFormValues, boolean>>, 
    field: keyof SignupFormValues
  ): boolean => {
    return Boolean(errors[field] && touched[field]);
  };

  return (
    <div className="flex flex-col">
      <div className="border-base-border-light bg-foreground z-10 rounded-xl border px-6 pt-8 pb-6 space-y-6 w-[380px] my-6">
        <div className="flex flex-col items-center text-center">
          <svg width="33" height="48" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_803)">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M6.54201 1.25805C7.12356 1.25805 7.66905 1.33601 8.1741 1.48059C7.67963 0.328169 6.65297 0 5.51038 0C4.36555 0 3.3371 0.329459 2.84375 1.48738C3.3451 1.33771 3.88824 1.25805 4.4678 1.25805H6.54201ZM4.33478 2.41504C1.57335 2.41504 0 4.58743 0 7.2672V10.02C0 10.288 0.223858 10.5 0.5 10.5H10.5C10.7761 10.5 11 10.288 11 10.02V7.2672C11 4.58743 9.17041 2.41504 6.40899 2.41504H4.33478ZM5.49609 7.29102C6.46259 7.29102 7.24609 6.50751 7.24609 5.54102C7.24609 4.57452 6.46259 3.79102 5.49609 3.79102C4.5296 3.79102 3.74609 4.57452 3.74609 5.54102C3.74609 6.50751 4.5296 7.29102 5.49609 7.29102ZM0 12.118C0 11.8501 0.223858 11.6328 0.5 11.6328H10.5C10.7761 11.6328 11 11.8501 11 12.118V15.0293C11 15.5653 10.5523 15.9998 10 15.9998H1C0.447715 15.9998 0 15.5653 0 15.0293V12.118Z" 
                fill="#E33E3F" 
              />
            </g>
            <defs>
              <clipPath id="clip0_1_803">
                <rect width="11" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h1 className="mt-6 text-2xl font-medium">Create Account</h1>
        </div>

        <Formik<SignupFormValues>
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, isValid, handleSubmit: formikHandleSubmit }: FormikProps<SignupFormValues>) => (
            <div>
              {/* Email Field */}
              <div className="w-full pb-1.5">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`bg-base-background-l0 text-high-emphasis placeholder-low-emphasis h-12 rounded-xl border-2 border-solid px-4 text-base ring-0 outline-hidden focus:ring-0 w-full ${
                    getFieldError(errors, touched, 'email')
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-base-border-light focus:border-accent-blue'
                  }`}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 px-1" />
                <div className="h-2" />
              </div>

              {/* Password Field */}
              <div className="pb-2">
                <PasswordField
                  name="password"
                  placeholder="Password"
                  showPassword={showPassword}
                  onToggleVisibility={() => setShowPassword(!showPassword)}
                  hasError={getFieldError(errors, touched, 'password')}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 px-1" />
                
                {/* Password Strength Indicator */}
                <div className="h-2" />
                <PasswordStrengthIndicator password={values.password} />
              </div>

              {/* Confirm Password Field */}
              <div className="mt-2 pb-2">
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  showPassword={showConfirmPassword}
                  onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                  hasError={getFieldError(errors, touched, 'confirmPassword')}
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 px-1" />
                <div className="h-2" />
              </div>

              {/* Terms Agreement */}
              <div className="mt-1 flex">
                <div className="flex items-center flex-row">
                  <Field
                    name="agreed"
                    type="checkbox"
                    className={`form-checkbox border-base-border-med bg-base-950 checked:border-base-border-med checked:bg-base-900 checked:hover:border-base-border-med focus:bg-base-900 focus:checked:border-base-border-med h-5 w-5 rounded-sm border-2 text-transparent ring-0 shadow-transparent ring-transparent outline-hidden focus:ring-0 focus:ring-offset-0 cursor-pointer ${
                      getFieldError(errors, touched, 'agreed') ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <label className="ml-2 text-xs/5">
                  By signing up, I agree to the{' '}
                  <a
                    className="text-accent-blue hover:text-med-emphasis font-medium text-xs"
                    target="_blank"
                    href="https://support.backpack.exchange/support/legal/general-legal/user-agreement"
                    rel="noopener noreferrer"
                  >
                    User Agreement
                  </a>{' '}
                  and{' '}
                  <a
                    className="text-accent-blue hover:text-med-emphasis font-medium text-xs"
                    target="_blank"
                    href="https://support.backpack.exchange/articles/privacy-policy"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              <ErrorMessage name="agreed" component="div" className="text-red-500 text-xs mt-1 px-1" />

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => formikHandleSubmit()}
                  disabled={isSubmitting || !isValid}
                  className="bg-button-primary-background text-button-primary-text disabled:text-base-600 h-12 rounded-xl px-4 py-2 text-center text-base font-semibold hover:opacity-90 focus:ring-blue-200 focus:outline-hidden disabled:opacity-80 w-full"
                >
                  {isSubmitting ? 'Signing up...' : 'Sign up'}
                </button>
              </div>
            </div>
          )}
        </Formik>

        {/* Referral Section */}
        <div>
          <button
            type="button"
            onClick={() => setShowReferral(!showReferral)}
            className="focus:none text-center font-semibold hover:opacity-90 focus:ring-blue-200 focus:outline-hidden disabled:opacity-80 disabled:hover:opacity-80 flex flex-col justify-center bg-transparent h-12 rounded-xl p-0 text-accent-purple mt-4 w-full items-center text-sm"
            aria-expanded={showReferral}
            aria-controls="referral-input"
          >
            {showReferral ? 'Hide referral' : 'Add referral'}
          </button>
          
          {showReferral && (
            <div className="mt-4" id="referral-input">
              <input
                type="text"
                placeholder="Referral code (optional)"
                className="bg-base-background-l0 text-high-emphasis placeholder-low-emphasis h-12 rounded-xl border-2 border-solid px-4 text-base ring-0 outline-hidden focus:ring-0 border-base-border-light focus:border-accent-blue w-full"
                aria-label="Referral code"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;