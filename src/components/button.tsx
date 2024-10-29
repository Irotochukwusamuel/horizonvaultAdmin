import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import LoadingAnimation from 'react-loading';
import { styled } from 'twin.macro';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'outline-green';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  customWidth?: number | 'full';
  icon?: { icon: React.ReactNode; position: 'left' | 'right' }[];
}

const IconContainer = styled.span<{ $position: 'left' | 'right' }>`
  order: ${({ $position }) => ($position === 'left' ? -1 : 1)};
`;

const inputClasses =
  'rounded-[4px] focus:outline-none transition duration-200 inline-flex items-center cursor-pointer disabled:cursor-default disabled:opacity-70 justify-center min-w-fit font-semibold gap-[8px] relative h-[36px]';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      loading,
      variant,
      size = 'md',
      customWidth,
      icon,
      ...restButtonProps
    },
    ref
  ) => {
    return (
      <button
        style={
          customWidth && customWidth !== 'full'
            ? { width: customWidth }
            : undefined
        }
        className={cn(
          inputClasses,
          variantStylesMap[variant],
          sizeStylesMap[size || 'md'],
          !customWidth ? 'w-fit' : customWidth === 'full' ? 'w-full' : '',
          className
        )}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...restButtonProps}
      >
        {loading && (
          <LoadingAnimation
            className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'
            type={'spin'}
            color={variant === 'secondary' ? '#101828' : 'white'}
            height={16}
            width={16}
          />
        )}

        {icon &&
          icon.map((item, index) => (
            <IconContainer key={index} $position={item.position}>
              {item.icon}
            </IconContainer>
          ))}

        <div className={loading ? 'opacity-0' : ''}>{children}</div>
      </button>
    );
  }
);

const variantStylesMap: Record<ButtonProps['variant'], string> = {
  primary:
    'bg-base-black text-base-white hover:opacity-70 disabled:bg-gray-300',
  secondary:
    'bg-base-white border border-base-black text-base-black hover:bg-purple-100 hover:text-base-white',
  success: 'bg-success-100 text-base-white  hover:bg-[#09781F]',
  warning: 'bg-orange-300 text-base-white',
  'outline-green': 'bg-none text-success-100',
};

const sizeStylesMap: Record<NonNullable<ButtonProps['size']>, string> = {
  lg: 'py-[10px] px-[83px]',
  md: 'py-[10px] px-[18px]',
  sm: 'py-[10px] px-[28px]',
};

Button.displayName = 'Button';

export default Button;
