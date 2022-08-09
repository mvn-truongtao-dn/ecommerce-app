import * as React from 'react';
import { LayoutProps } from '../../models/common';

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <div>
        {children}
    </div>
  );
}
