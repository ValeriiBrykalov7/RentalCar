'use client';

import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { createBookingRequest } from '@/lib/api/clientApi';
import type { BookingData } from '@/types/bookingData';

type BookCarFormProps = {
  carId: string;
};

type BookCarFormValues = BookingData;
type BookingMutationVariables = {
  bookingData: BookingData;
  resetForm: FormikHelpers<BookCarFormValues>['resetForm'];
};

const initialValues: BookCarFormValues = {
  name: '',
  email: '',
  comment: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be 50 characters or less')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  comment: yup
    .string()
    .trim()
    .max(500, 'Comment must be 500 characters or less')
    .required('Comment is required'),
});

const getFieldClassName = (hasError: boolean) =>
  `form-field w-full rounded-xl bg-(--inputs) px-[18px] text-base leading-[1.25] font-medium text-(--main) outline-none placeholder:text-(--gray) ${
    hasError ? 'inputError' : ''
  }`;

export default function BookCarForm({ carId }: BookCarFormProps) {
  const bookingMutation = useMutation({
    mutationFn: ({ bookingData }: BookingMutationVariables) =>
      createBookingRequest(carId, bookingData),
    onSuccess: (_data, variables) => {
      toast.success('Booking request sent successfully');
      variables.resetForm();
    },
    onError: () => {
      toast.error('Failed to send booking request');
    },
  });

  const handleSubmit = (
    values: BookCarFormValues,
    helpers: FormikHelpers<BookCarFormValues>,
  ) => {
    bookingMutation.mutate(
      {
        bookingData: {
          name: values.name.trim(),
          email: values.email.trim(),
          comment: values.comment.trim(),
        },
        resetForm: helpers.resetForm,
      },
      {
        onSettled: () => {
          helpers.setSubmitting(false);
        },
      },
    );
  };

  return (
    <section className='rounded-2xl bg-(--white) px-[32px] py-[32px]'>
      <h2 className='mb-[8px] text-xl leading-[1.2] font-semibold text-(--main)'>
        Book your car now
      </h2>
      <p className='mb-[24px] text-base leading-[1.25] font-medium text-(--gray)'>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleSubmit,
          isSubmitting,
          setTouched,
          touched,
          validateForm,
        }) => (
          <Form
            className='flex flex-col gap-[16px]'
            onSubmit={async (event) => {
              event.preventDefault();

              const validationErrors = await validateForm();
              const firstError = Object.values(validationErrors)[0];

              if (firstError) {
                await setTouched({
                  name: true,
                  email: true,
                  comment: true,
                });
                toast.error(String(firstError));
                return;
              }

              handleSubmit(event);
            }}
          >
            <label className='relative block'>
              <Field
                className={`${getFieldClassName(
                  Boolean(touched.name && errors.name),
                )} h-[48px]`}
                name='name'
                placeholder='Name*'
              />
              <ErrorMessage name='name'>
                {(message) => <span className='error'>{message}</span>}
              </ErrorMessage>
            </label>

            <label className='relative block'>
              <Field
                className={`${getFieldClassName(
                  Boolean(touched.email && errors.email),
                )} h-[48px]`}
                name='email'
                placeholder='Email*'
                type='email'
              />
              <ErrorMessage name='email'>
                {(message) => <span className='error'>{message}</span>}
              </ErrorMessage>
            </label>

            <label className='relative mb-[8px] block'>
              <Field
                as='textarea'
                className={`${getFieldClassName(
                  Boolean(touched.comment && errors.comment),
                )} h-[88px] resize-none py-[14px]`}
                name='comment'
                placeholder='Comment'
              />
              <ErrorMessage name='comment'>
                {(message) => <span className='error'>{message}</span>}
              </ErrorMessage>
            </label>

            <button
              className='button w-full'
              type='submit'
              disabled={isSubmitting || bookingMutation.isPending}
            >
              {isSubmitting || bookingMutation.isPending ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
