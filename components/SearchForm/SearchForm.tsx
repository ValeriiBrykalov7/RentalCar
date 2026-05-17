'use client';

import { useQuery } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { getCarFilters, type CarsQueryParams } from '@/lib/api/clientApi';
import SelectField, {
  type SelectOption,
} from '@/components/SelectField/SelectField';

type SearchFormValues = {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
};

type SearchFormProps = {
  onSubmit: (filters: CarsQueryParams) => void;
};

const initialValues: SearchFormValues = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};

const priceOptions = [30, 40, 50, 60, 70, 80, 90];
const priceSelectOptions: SelectOption[] = priceOptions.map((price) => ({
  value: String(price),
  label: String(price),
}));

const optionalMileage = yup
  .number()
  .transform((value, originalValue) =>
    originalValue === '' ? undefined : value,
  )
  .typeError('Mileage must be a number')
  .integer('Mileage must be an integer')
  .min(0, 'Mileage cannot be negative')
  .notRequired();

const validationSchema = yup.object({
  brand: yup.string(),
  price: yup.string().oneOf(['', ...priceOptions.map(String)]),
  minMileage: optionalMileage,
  maxMileage: optionalMileage.test(
    'max-mileage-is-greater',
    'Max mileage must be greater than min mileage',
    function validateMaxMileage(maxMileage) {
      const { minMileage } = this.parent as SearchFormValues;

      if (!minMileage || maxMileage === undefined) {
        return true;
      }

      return Number(minMileage) <= Number(maxMileage);
    },
  ),
});

const buildFilters = (values: SearchFormValues): CarsQueryParams => ({
  ...(values.brand ? { brand: values.brand } : {}),
  ...(values.price ? { price: Number(values.price) } : {}),
  ...(values.minMileage ? { minMileage: Number(values.minMileage) } : {}),
  ...(values.maxMileage ? { maxMileage: Number(values.maxMileage) } : {}),
});

const showValidationToast = (message: string) => {
  toast.error(message || 'Please check search filters');
};

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const { data: filters, isLoading } = useQuery({
    queryKey: ['filters'],
    queryFn: getCarFilters,
  });
  const brandOptions: SelectOption[] =
    filters?.brands.map((brand) => ({
      value: brand,
      label: brand,
    })) ?? [];

  const handleSubmit = (
    values: SearchFormValues,
    helpers: FormikHelpers<SearchFormValues>,
  ) => {
    onSubmit(buildFilters(values));
    helpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting, resetForm, validateForm }) => (
        <Form
          className='mt-[84px] mb-[88px] flex w-full items-end justify-center gap-[16px]'
          onSubmit={async (event) => {
            event.preventDefault();

            const errors = await validateForm();
            const firstError = Object.values(errors)[0];

            if (firstError) {
              showValidationToast(String(firstError));
              return;
            }

            handleSubmit(event);
          }}
        >
          <div>
            <SelectField
              name='brand'
              label='Car brand'
              placeholder='Choose a brand'
              options={brandOptions}
              isLoading={isLoading}
            />
            <ErrorMessage name='brand'>
              {(message) => <span className='sr-only'>{message}</span>}
            </ErrorMessage>
          </div>

          <div>
            <SelectField
              name='price'
              label='Price/ 1 hour'
              placeholder='Choose a price'
              options={priceSelectOptions}
            />
            <ErrorMessage name='price'>
              {(message) => <span className='sr-only'>{message}</span>}
            </ErrorMessage>
          </div>

          <fieldset className='flex flex-col gap-[8px]'>
            <legend className='mb-[8px] text-xs leading-[1.333] font-medium text-(--gray)'>
              Car mileage / km
            </legend>
            <div className='flex h-[48px] overflow-hidden rounded-xl border border-transparent bg-(--white) transition-[border-color,box-shadow] duration-200 hover:border-(--light-blue) focus-within:border-(--light-blue) focus-within:shadow-[var(--shadow-focus)]'>
              <Field
                className='number-input h-full w-[160px] border-r border-(--gray-light) bg-transparent px-[24px] text-base leading-[1.25] font-medium text-(--main) outline-none placeholder:text-[color:var(--main)]'
                name='minMileage'
                type='number'
                min='0'
                placeholder='From'
              />
              <Field
                className='number-input h-full w-[160px] bg-transparent px-[24px] text-base leading-[1.25] font-medium text-(--main) outline-none placeholder:text-[color:var(--main)]'
                name='maxMileage'
                type='number'
                min='0'
                placeholder='To'
              />
            </div>
            <ErrorMessage name='minMileage'>
              {(message) => <span className='sr-only'>{message}</span>}
            </ErrorMessage>
            <ErrorMessage name='maxMileage'>
              {(message) => <span className='sr-only'>{message}</span>}
            </ErrorMessage>
          </fieldset>

          <div className='relative flex flex-col items-center'>
            <button
              className='button w-[156px]'
              type='submit'
              disabled={isSubmitting}
            >
              Search
            </button>
            <button
              className='absolute top-[52px] text-base leading-[1.25] font-medium whitespace-nowrap text-(--gray) transition-colors hover:text-(--dark-blue) focus-visible:text-(--dark-blue) focus-visible:outline-none'
              type='button'
              onClick={() => resetForm()}
            >
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
