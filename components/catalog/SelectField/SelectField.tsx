'use client';

import dynamic from 'next/dynamic';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  isLoading?: boolean;
};

const SelectField = dynamic(() => import('./SelectFieldClient'), {
  ssr: false,
});

export default SelectField;
