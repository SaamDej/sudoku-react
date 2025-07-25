import { useCallback, useEffect, useRef } from "react";
import { createKeyMap } from "../utilities";
const useKeyBoardHandler = (
  keys: string[], // Array of keys to listen for
  callback: Function, // Function to execute when a key is pressed
  node = null // Optional DOM element to attach listener to (defaults to document)
) => {
  /** convert keyboard event codes to actual numbers.*/
  const keyMap = createKeyMap();
  /** uses useRef to maintain a stable reference to the callback function across renders */
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  /** Checks if pressed key matches either:
  - Direct key match (e.g., 'w', 'a', 's', 'd')
  - Numeric key match after parsing (1-9) 
  */
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      /** If one of the keys in the keys array is the same as the event key
       * run the callback function while passing the event.
       *
       * This works for movement keys and numbers without shift being held.
       */
      if (keys.some((key) => event.key == key)) {
        callbackRef.current(event);
        return;
      }
      /** handle keyboard press for keys 1-9 when shift is enabled */
      const parsedKey: number = keyMap.get(event.code) || 0;
      if (keys.some((key) => parsedKey.toString() == key)) {
        callbackRef.current(event);
      }
    },
    [keys, keyMap]
  );

  /** Sets up and cleans up the keyboard event listener on the specified node or document */
  useEffect(() => {
    /**
     * If nothing is passed to node,
     * the eventlistener is document-wide.
     * If DOM element is passed to node,
     * the eventlistener is restricted to the node.
     **/
    const targetNode = node ?? document;

    targetNode.addEventListener("keydown", handleKeyPress);
    return () => {
      targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, node]);
};

export default useKeyBoardHandler;
