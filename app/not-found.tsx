import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <section>
        <p>404</p>
        <h1>Сторінку не знайдено</h1>
        <p>Можливо, посилання застаріло або сторінку було переміщено.</p>
        <button type='button'>
          <Link href='/'>На головну</Link>
        </button>
      </section>
    </main>
  );
}
