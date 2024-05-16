import { useEffect } from 'react';
import { useRevalidator } from '@remix-run/react';

export function useRevalidateOnFocus() {
  const revalidator = useRevalidator();

  useEffect(() => {
    function onFocus() {
      revalidator.revalidate();
    }
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [revalidator]);

  useEffect(() => {
    function onVisibilityChange() {
      revalidator.revalidate();
    }
    window.addEventListener('visibilitychange', onVisibilityChange);
    return () => window.removeEventListener('visibilitychange', onVisibilityChange);
  }, [revalidator]);
}
