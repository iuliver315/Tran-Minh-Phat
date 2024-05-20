import { useEffect, useState } from "react";
import { getItem,setItem } from "@/utils/browser.util";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLocalStorage = (key: string, defaultValue?: any) => {
  const [value, setValue] = useState(
    // There is item in the local storage use it otherwise use the default value
    function () {
      return getItem(key);
    } || defaultValue
  );

  useEffect(() => {
    setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};
export default useLocalStorage;
