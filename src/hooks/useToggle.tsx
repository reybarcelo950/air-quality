import { useCallback, useState } from 'react';

const useToggle = (init: boolean = false) => {
  const [isOpen, setOpen] = useState(init);

  const onToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    isOpen,
    setOpen,
    onToggle,
    onOpen,
    onClose,
  };
};

export default useToggle;
