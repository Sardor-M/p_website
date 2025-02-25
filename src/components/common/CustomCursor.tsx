import { useState, useEffect } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.mode === 'dark' ? '#7DDE92' : '#3083dc'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(${props => props.x}px, ${props => props.y}px);
  transition: transform 0.1s ease-out;
  box-shadow: 0 0 12px 1px rgba(62, 177, 254, 0.7);
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // we show the cursor when it moves
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    // we hide it when it leaves window
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // remove the listeners 
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return <CursorDot x={position.x} y={position.y} />;
};

export default CustomCursor;