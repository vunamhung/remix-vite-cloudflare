import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';

export function useDoubleCheck() {
  const [doubleCheck, setDoubleCheck] = useState(false);

  function getButtonProps(props?: ButtonHTMLAttributes<HTMLButtonElement>) {
    const onBlur: ButtonHTMLAttributes<HTMLButtonElement>['onBlur'] = () => setDoubleCheck(false);

    const onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = doubleCheck
      ? undefined
      : (e) => {
          e.preventDefault();
          setDoubleCheck(true);
        };

    const onKeyUp: ButtonHTMLAttributes<HTMLButtonElement>['onKeyUp'] = (e) => {
      if (e.key === 'Escape') {
        setDoubleCheck(false);
      }
    };

    return {
      ...props,
      onBlur: callAll(onBlur, props?.onBlur),
      onClick: callAll(onClick, props?.onClick),
      onKeyUp: callAll(onKeyUp, props?.onKeyUp),
    };
  }

  return { doubleCheck, getButtonProps };
}

function callAll<Args extends Array<unknown>>(...fns: Array<((...args: Args) => unknown) | undefined>) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}
