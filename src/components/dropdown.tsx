'use client';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Typography from './typography';

export default function Dropdown({
  placeholder,
  items,
  onChange,
  defaultValue,
  label,
  errorText,
  className,
  requiredLabel,
}: {
  label?: string;
  placeholder?: string;
  items: { value: string; label: string }[];
  onChange?: (value?: string) => void;
  defaultValue?: string;
  errorText?: string;
  className?: string;
  requiredLabel?: string;
}) {
  const initVal = items.find((i) => i.value === defaultValue);

  return (
    <div className={cn(className)}>
      {(label || requiredLabel) && (
        <label className='mb-[6px] flex'>
          <Typography variant='body-2' className='text-gray-200'>
            {label || requiredLabel}
          </Typography>
          {requiredLabel ? <span className='text-warning'>*</span> : null}
        </label>
      )}
      <Select onValueChange={onChange} value={defaultValue}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='mt-0 text-left'>
          {items.map(({ value, label }, index) => (
            <SelectItem key={index} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorText && (
        <Typography
          variant='btn-text-small'
          className='break-words text-error-100'
        >
          {errorText}
        </Typography>
      )}
    </div>
  );
}
