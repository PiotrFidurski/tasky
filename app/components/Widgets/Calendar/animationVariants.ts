export const variants = {
  enter: (direction: string) => {
    return {
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: string) => {
    return {
      x: direction === 'left' ? 300 : -300,
      opacity: 0,
    };
  },
};
