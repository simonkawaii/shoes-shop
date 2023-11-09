import { useState } from "react";

// useDebounce is a custom hook to prevent from unnecessary api calls while typing
const useDebounce = (): Function => {
  const [inputTimeout, setInputTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const debounce = (
    timeoutFunctionCall: () => void,
    wait: number = 1000
  ): void => {
    // clear timeout after input change
    clearTimeout(inputTimeout);

    // set function to execute
    const callTimeout = setTimeout(() => timeoutFunctionCall(), wait);

    // set new function call
    setInputTimeout(callTimeout);
  };
  return debounce;
};
export default useDebounce;
