import * as React from 'react';

type LayoutProps = React.HTMLAttributes<HTMLDivElement | HTMLElement>;

export function RootLayout({ children }: LayoutProps) {
  return <div className="w-full h-full flex">{children}</div>;
}

export function SidebarLayout({ children }: LayoutProps) {
  return (
    <div className="md:max-w-[19rem] md:relative w-full h-full absolute">
      {children}
    </div>
  );
}

export function MainLayout({ children }: LayoutProps) {
  return <main className="w-full">{children}</main>;
}

export function ContentLayout({ children }: LayoutProps) {
  return <div className="w-full mt-16 md:mt-0 p-2">{children}</div>;
}
