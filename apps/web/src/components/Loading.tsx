import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const LoadingContainer = styled.div`
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
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(28, 28, 28, 0.9)' : 'rgba(248, 248, 248, 0.9)'};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => `
    linear-gradient(
      45deg,
      ${theme.mode === 'dark' ? '#D3D3D3' : '#F0F0F0'} 0%,
      ${theme.mode === 'dark' ? '#A9A9A9' : '#DCDCDC'} 50%,
      ${theme.mode === 'dark' ? '#808080' : '#E0E0E0'} 100%
    )
  `};
  animation:
    ${rotateAnimation} 1.5s linear infinite,
    ${pulseAnimation} 2s ease-in-out infinite;
  box-shadow: ${({ theme }) => `
    0 0 20px ${theme.mode === 'dark' ? 'rgba(169, 169, 169, 0.7)' : 'rgba(169, 169, 169, 0.5)'},
    0 0 30px ${theme.mode === 'dark' ? 'rgba(105, 105, 105, 0.3)' : 'rgba(211, 211, 211, 0.3)'}
  `};
  transition: transform 0.2s ease-in-out;
`;

const LoadingText = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  font-size: 0.9rem;
  font-weight: 300;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#D3D3D3' : '#666666')};
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 4s linear infinite;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: ${({ theme }) => (theme.mode === 'dark' ? '0 0 5px #A9A9A9' : '0 0 5px #DCDCDC')};
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>loading</LoadingText>
    </LoadingContainer>
  );
}
