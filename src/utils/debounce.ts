export const debounce = (time: number, cb: (arg: any) => void) => {
  let timerId: NodeJS.Timeout;
  return (arg: any) => {
    if (!!timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      cb(arg);
      if (!!timerId) {
        clearTimeout(timerId);
      }
    }, time);
  };
};
