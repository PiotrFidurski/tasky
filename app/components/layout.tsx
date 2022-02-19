import clsx from 'clsx';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full relative p-4 gap-2 items-start">
      {children}
    </main>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[4rem] lg:max-w-[16rem] w-full fixed">{children}</div>
  );
}

export function CalendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border dark:border-custom__gray max-h-[calc(100vh-3rem)] h-full overflow-auto">
      {children}
    </div>
  );
}

type ContentLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export function ContentLayout({ children, className }: ContentLayoutProps) {
  return (
    <div
      className={clsx(
        'p-2 w-full flex flex-col md:flex-row gap-2 ml-[4rem] lg:ml-[16rem]',
        className
      )}
    >
      {children}
    </div>
  );
}

type ColumnLayoutProps = React.HTMLAttributes<HTMLElement>;

export function ColumnLayout({ children, ...sectionProps }: ColumnLayoutProps) {
  return (
    <section className="w-full flex flex-col" {...sectionProps}>
      {children}
    </section>
  );
}
