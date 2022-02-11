import clsx from 'clsx';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full relative px-4 py-4 gap-2 items-start">
      {children}
    </main>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[16rem] w-full rounded-md border border-slate-300 sticky top-4">
      {children}
    </div>
  );
}

export function CalendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[22.2rem] w-full max-h-[calc(100vh-3rem)] h-full min-h-[calc(100vh-3rem)] overflow-auto">
      {children}
    </div>
  );
}

type ContentLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export function ContentLayout({ children, className }: ContentLayoutProps) {
  return (
    <div
      className={clsx(
        'px-2 py-2 border border-slate-300 rounded-md w-full flex gap-2',
        className
      )}
    >
      {children}
    </div>
  );
}

type ColumnLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export function ColumnLayout({ children, ...sectionProps }: ColumnLayoutProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className="w-full" {...sectionProps}>
      {children}
    </section>
  );
}
