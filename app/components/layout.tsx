import * as React from 'react';

type LayoutProps = React.HTMLAttributes<HTMLDivElement | HTMLElement>;

export function RootLayout({ children }: LayoutProps) {
  return <div className="w-full h-full flex">{children}</div>;
}

export function SidebarLayout({ children }: LayoutProps) {
  return (
    <div className="md:max-w-[16rem] md:relative w-full h-full absolute z-10">
      {children}
    </div>
  );
}

export function MainLayout({ children }: LayoutProps) {
  return <main className="w-full">{children}</main>;
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
    <div className="w-full border max-h-[calc(100vh-3rem)] h-full overflow-auto">
      {children}
    </div>
  );
}

export function ContentLayout({ children }: LayoutProps) {
  return <div className="w-full mt-12 p-2">{children}</div>;
}

type ColumnLayoutProps = React.HTMLAttributes<HTMLElement>;

export function ColumnLayout({ children, ...sectionProps }: ColumnLayoutProps) {
  return (
    <section className="w-full flex flex-col" {...sectionProps}>
      {children}
    </section>
  );
}
