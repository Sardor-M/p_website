import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0%, 100% { 
    transform: scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: scale(1.1); 
    opacity: 0.7; 
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

export const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
`;

export const Loading = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);
