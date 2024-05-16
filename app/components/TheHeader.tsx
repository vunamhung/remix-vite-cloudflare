import { NavLink } from '@remix-run/react';
import { Logo } from '~/components';
import { useSettings } from '~/hooks';
import { cn } from '~/utilities';

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
  const { menu } = useSettings();

  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-wrap gap-x-6">
        {menu?.primary?.map(({ title, path }, index) => (
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
