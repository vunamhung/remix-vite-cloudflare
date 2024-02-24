import type { FC, ReactNode } from 'react';
import { TheFooter, TheHeader } from '~/components';

export const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <TheHeader />
    {children}
    <TheFooter />
  </>
);
