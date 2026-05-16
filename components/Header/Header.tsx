'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Logo/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='h-[68px] border-b border-(--badges) bg-(--white)'>
      <div className='container flex h-full items-center justify-between'>
        <Logo />

        <nav aria-label='Main navigation'>
          <ul className='flex items-center gap-8'>
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`link ${isActive ? 'link-active' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
