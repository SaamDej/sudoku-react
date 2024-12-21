import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useKeyBoardHandler = (
  keys: string[],
  callback: Function,
  node = null
) => {
  const keyMap = new Map();
  for (let i = 0; i < 9; i++) {
    keyMap.set(`Digit${i + 1}`, i + 1);
  }
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (keys.some((key) => event.key == key)) {
        callbackRef.current(event);
      } else {
        const parsedKey: number = keyMap.get(event.code) || 0;
        if (keys.some((key) => parsedKey.toString() == key)) {
          callbackRef.current(event);
        }
      }
    },
    [keys]
  );

  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (keys.some((key) => event.key == key)) {
  //       callbackRef.current(event);
  //     }
  //   };

  useEffect(() => {
    const targetNode = node ?? document;

    targetNode.addEventListener("keydown", handleKeyPress);
    return () => {
      targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, node]);
};

export default useKeyBoardHandler;
