import { media } from '@/themes/themes/media';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

type CursorDotProps =  {
  x: number;
  y: number;
  visible: boolean;
}

const CursorDot = styled.div<CursorDotProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 12px; 
  height: 12px;
  background-color: #3083dc; /* Always blue */
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  transition: transform 0.1s ease-out, opacity 0.2s ease;
  box-shadow: 0 0 10px 1px rgba(48, 131, 220, 0.7); /* Blue shadow */
  opacity: ${(props) => (props.visible ? 1 : 0)};
  display: none;

  ${media.desktop} {
    display: block;
  }
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // we check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return <CursorDot x={position.x} y={position.y} visible={isVisible} />;
};

export default CustomCursor;