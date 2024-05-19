import { NavLink } from '@remix-run/react';
import { Logo } from '~/components';
import { useRootLoaderData } from '~/root';
import { cn } from '~/utils';

export const TheHeader = () => {
  return (
    <header>
      <div className="container flex items-center justify-between py-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

const Navigation = () => {
  const root = useRootLoaderData();

  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-wrap gap-x-6">
        {root?.menu?.primary?.map(({ title, path }, index) => (
          <li key={index}>
            <NavLink className={({ isActive }) => cn('hover:underline dark:text-white', isActive && 'underline')} prefetch="intent" to={path}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
