export const variants = {
  enter: (direction: string) => {
    return {
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: string) => {
    return {
      zIndex: 0,
      x: direction === 'left' ? 300 : -300,
      opacity: 0,
    };
  },
};
