import * as React from 'react';

type LayoutProps = React.HTMLAttributes<HTMLDivElement | HTMLElement>;

export function RootLayout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full dark:text-custom__ghostly relative flex">
      {children}
    </div>
  );
}

export function MainLayout({ children }: LayoutProps) {
  return <main className="w-full">{children}</main>;
}

export function SidebarLayout({ children }: LayoutProps) {
  return (
    <div className="max-w-full md:max-w-[16rem] w-full md:flex md:items-start md:h-full md:relative absolute z-50">
      {children}
    </div>
  );
}

export function MobileNavLayout({ children }: LayoutProps) {
  return (
    <div className="fixed left-0 right-0 bottom-0 z-50 md:hidden">
      {children}
    </div>
  );
}

export function CalendarLayout({ children }: LayoutProps) {
  return (
    <div className="w-full border dark:border-custom__gray max-h-[calc(100vh-3rem)] h-full overflow-auto">
      {children}
    </div>
  );
}

export function ContentLayout({ children }: LayoutProps) {
  return <div className="w-full">{children}</div>;
}

type ColumnLayoutProps = React.HTMLAttributes<HTMLElement>;

export function ColumnLayout({ children, ...sectionProps }: ColumnLayoutProps) {
  return (
    <section className="w-full flex flex-col" {...sectionProps}>
      {children}
    </section>
  );
}
