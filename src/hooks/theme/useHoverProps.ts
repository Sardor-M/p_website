import { useState, useCallback } from 'react';

type HoverProps = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
};

const useHoverProps = (): [HoverProps, boolean, boolean] => {
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
    setIsClicked(false);
  }, []);

  const onMouseDown = useCallback(() => {
    setIsClicked(true);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsClicked(false);
  }, []);

  const hoverProps: HoverProps = {
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
  };

  return [hoverProps, isHover, isClicked];
};

export default useHoverProps;