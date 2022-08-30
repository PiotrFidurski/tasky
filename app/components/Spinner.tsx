export function Spinner() {
  return (
    <div
      className={`
        w-5 h-5 border-2 bg-light-rgba dark:bg-dark-rgba border-custom-indigo  dark:border-custom-blue
      dark:border-b-dark-rgba dark:border-l-dark-rgba dark:border-r-dark-rgba
      border-b-dark-rgba border-l-dark-rgba border-r-dark-rgba animate-spin rounded-full
    `}
    />
  );
}
