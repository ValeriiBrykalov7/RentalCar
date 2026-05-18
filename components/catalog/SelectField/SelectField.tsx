'use client';

import Select, {
  components,
  type DropdownIndicatorProps,
  type SingleValue,
  type StylesConfig,
} from 'react-select';
import { useField } from 'formik';
import Icon from '@/components/shared/Icon/Icon';
import { Loader } from '@/components/shared/Loader/Loader';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  isLoading?: boolean;
};

const selectStyles: StylesConfig<SelectOption, false> = {
  container: (base) => ({
    ...base,
    width: 204,
  }),
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    height: 44,
    border: `1px solid ${
      state.isFocused ? 'var(--light-blue)' : 'transparent'
    }`,
    borderRadius: 12,
    backgroundColor: 'var(--white)',
    boxShadow: state.isFocused ? 'var(--shadow-focus)' : 'none',
    cursor: 'pointer',
    transition:
      'border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
    '&:hover': {
      borderColor: 'var(--light-blue)',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: 44,
    padding: '0 0 0 18px',
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    color: 'var(--main)',
    fontFamily: 'var(--font-family)',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
  }),
  singleValue: (base) => ({
    ...base,
    margin: 0,
    color: 'var(--main)',
    fontFamily: 'var(--font-family)',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: 'var(--main)',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: 44,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '18px',
    fill: 'var(--main)',
    cursor: 'pointer',
    '&:hover': {
      fill: 'var(--dark-blue)',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    width: 204,
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: 'var(--white)',
    boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02)',
    overflow: 'hidden',
    zIndex: 100,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 224,
    margin: '12px 8px',
    '&::-webkit-scrollbar': {
      width: 8,
      height: 128,
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
      width: 0,
      height: 0,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 999,
      backgroundColor: 'var(--gray-light)',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--badges)' : 'var(--white)',
    color: state.isSelected ? 'var(--main)' : 'var(--gray)',
    fontFamily: 'var(--font-family)',
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'var(--badges)',
    },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: 'var(--gray)',
    fontFamily: 'var(--font-family)',
    fontSize: 16,
  }),
};

function DropdownIndicator(props: DropdownIndicatorProps<SelectOption, false>) {
  if (props.selectProps.isLoading) {
    return (
      <components.DropdownIndicator {...props}>
        <Loader variant='inline' />
      </components.DropdownIndicator>
    );
  }

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name='icon-arrow-up'
        size={16}
        className={`transition-transform duration-200 ${
          props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'
        }`}
      />
    </components.DropdownIndicator>
  );
}

function LoadingIndicator() {
  return null;
}

export default function SelectField({
  name,
  label,
  placeholder,
  options,
  isLoading = false,
}: SelectFieldProps) {
  const [field, , helpers] = useField<string>(name);
  const selectedOption =
    options.find((option) => option.value === field.value) ?? null;

  const handleChange = (option: SingleValue<SelectOption>) => {
    helpers.setValue(option?.value ?? '');
  };

  return (
    <label className='flex flex-col gap-[8px] text-xs leading-[1.333] font-medium text-(--gray)'>
      {label}
      <Select<SelectOption, false>
        instanceId={name}
        inputId={name}
        name={name}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        placeholder={isLoading ? '' : placeholder}
        isLoading={isLoading}
        isDisabled={isLoading}
        isSearchable={false}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
          LoadingIndicator,
        }}
        styles={selectStyles}
      />
    </label>
  );
}
