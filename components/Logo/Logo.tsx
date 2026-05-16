import Link from 'next/link';

export default function Logo() {
  return (
    <Link className='logo-link' href='/' aria-label='RentalCar home page'>
      <svg
        className='logo-link-icon'
        width='104'
        height='16'
        aria-hidden='true'
        focusable='false'
      >
        <use href='/rentalCar.svg'></use>
      </svg>
    </Link>
  );
}
