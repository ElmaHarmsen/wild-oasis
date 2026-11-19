import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  // refs store information that do not affect the visual output of a component

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
        // ref.current is based on e (DOM element in this case)
      }

      document.addEventListener("click", handleClick, listenCapturing);
      // "true" as the third argument ensures that the event will be handled in the capturing phase (as the event moves down the tree)
      // without the "true" parameter the event will bubble-up and the modal will open but immediately close again
      // because by opening the modal it will be attached to the DOM (createPortal) and the click is detected outside the modal window

      // Remove the eventlistener when the component unmounts
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
  // returning the ref so that the Modal component has access to it

  // From Udemy AI assistant
  // When this ref is returned from the hook and used in the Modal component (e.g., attached to a modal's root element), it connects the modal to that specific DOM node.
  // By returning ref, you ensure that the Modal component has access to the correct DOM element
}
