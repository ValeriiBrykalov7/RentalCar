type LoaderProps = {
  variant?: 'page' | 'inline' | 'button';
};

const loaderStyles: Record<
  NonNullable<LoaderProps['variant']>,
  {
    wrapper: string;
    dot: string;
  }
> = {
  page: {
    wrapper: 'flex min-h-64 items-center justify-center gap-3',
    dot: 'size-4 bg-(--dark-blue)',
  },
  inline: {
    wrapper: 'inline-flex items-center gap-2 align-middle',
    dot: 'size-3 bg-(--dark-blue)',
  },
  button: {
    wrapper: 'inline-flex items-center justify-center gap-1.5 align-middle',
    dot: 'size-2 bg-white',
  },
};

export const Loader = ({ variant = 'page' }: LoaderProps) => {
  const styles = loaderStyles[variant];

  return (
    <div className={styles.wrapper} role='status' aria-label='Loading'>
      <span className={`${styles.dot} animate-bounce rounded-full`}></span>
      <span
        className={`${styles.dot} animate-bounce rounded-full [animation-delay:0.2s]`}
      ></span>
      <span
        className={`${styles.dot} animate-bounce rounded-full [animation-delay:0.4s]`}
      ></span>
    </div>
  );
};
