import styled, { keyframes } from "styled-components";

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
  min-height: 100vh;
  width: 100%;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => 
    theme.mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"};
  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
`;

export const Loading = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);