import { css } from 'styled-components';

export const cardSizes = {
  sm: css`
    min-width: 200px;
  `,
  md: css`
    min-width: 300px;
  `,
  lg: css`
    min-width: 400px;
  `
};

export const cardPadding = {
  none: css`
    padding: 0;
  `,
  sm: css`
    padding: 0.5rem;
  `,
  md: css`
    padding: 1rem;
  `,
  lg: css`
    padding: 1.5rem;
  `
};

export const cardVariants = {
  elevated: css`
    background-color: ${({ theme }) => theme.cardBg};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `,
  gray: css`
    background-color: ${({theme}) => theme.mode === 'dark' ? '#282828' : 'white'};
    color: ${({ theme }) => theme.mode === 'dark' ? 'white' : '#282828'};
  `,
  light: css`
    background-color: ${({ theme }) => theme.mode === 'dark' ? '#383838' : '#FFFFFF'};
    color: ${({ theme }) => theme.mode === 'dark' ? 'white' : '#282828'};
  `,
};

