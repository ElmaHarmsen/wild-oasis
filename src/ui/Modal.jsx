import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openWindowName, setOpenWindowName] = useState("");

  const close = () => setOpenWindowName("");
  const open = setOpenWindowName;

  return (
    <ModalContext.Provider value={{ openWindowName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // clone the button in Modal.Open from AddCabin
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openWindowName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openWindowName) return null;

  // createPortal to reposition the returned jsx to anywhere else in the DOM
  // to prevent issues with overflow hidden set on the parent (so better reusability)
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* <div>{children}</div> */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        {/* Cloning the children element allows to maintain the original component while enabling dynamic control based on the state managed in the Modal context */}
        {/* onCloseModal is to determine the style of the modal */}
      </StyledModal>
    </Overlay>,
    document.body,
    // where the jsx should be placed can be any other element
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
