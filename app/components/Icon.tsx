import type { SVGProps } from 'react';
import { IconName } from '../../public/icons/name';

export const Icon = ({ name, className, children, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) => {
  if (children) {
    return (
      <span className="inline-flex gap-x-2">
        <Icon name={name} className={className} {...props} />
        {children}
      </span>
    );
  }

  return (
    <svg {...props} className={`inline self-center ${className}`}>
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};
