import * as React from 'react';

type LayoutProps = React.HTMLAttributes<HTMLDivElement | HTMLElement>;

export function RootLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full flex md:flex-row flex-col">{children}</div>
  );
}

export function SidebarLayout({ children }: LayoutProps) {
  return (
    <div className="md:max-w-[19rem] max-w-0 w-full h-full">{children}</div>
  );
}

export function MainLayout({ children }: LayoutProps) {
  return <main className="w-full">{children}</main>;
}

export function ContentLayout({ children }: LayoutProps) {
  return (
    <div className="w-full p-2 grid lg:grid-cols-24rem-auto1fr grid-cols-col-32 gap-6">
      {children}
    </div>
  );
}
