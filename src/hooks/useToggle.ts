import { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return {
    isOpen,
    toggle,
  };
};

export default useToggle;
