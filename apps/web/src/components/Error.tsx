import { getThemeStyles } from '@/themes';
import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  ${({ theme }) => getThemeStyles(theme, 'background')}
`;

export const ErrorMessage = styled.div`
  ${({ theme }) => getThemeStyles(theme, ['background', 'text'])}
  padding: 1rem;
  border-radius: 8px;
  max-width: 400px;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  ${({ theme }) => getThemeStyles(theme, 'text')}
  margin-bottom: 0.5rem;
`;

export const Error = ({ message }: { message?: string }) => (
  <ErrorContainer>
    <ErrorTitle>Oops! Something went wrong</ErrorTitle>
    <ErrorMessage>{message || 'Unable to load the content. Please try again later.'}</ErrorMessage>
  </ErrorContainer>
);
