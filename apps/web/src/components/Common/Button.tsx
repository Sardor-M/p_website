import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  asChild?: boolean;
  href?: string;
  fullWidth?: boolean;
};

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.focusRing || '#e5e7eb'};
  }
`;

const sizeStyles = {
  sm: css`
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    gap: 0.5rem;
  `,
  md: css`
    padding: 0.75rem 1rem;
    font-size: 1rem;
    gap: 0.75rem;
  `,
  lg: css`
    padding: 1rem 1.5rem;
    font-size: 1.125rem;
    gap: 1rem;
  `,
};

const variantStyles = {
  default: css`
    background-color: ${(props) => props.theme.primary || '#3b82f6'};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.primaryHover || '#2563eb'};
    }
  `,
  outline: css`
    background-color: transparent;
    border: 1.5px solid ${(props) => props.theme.border || '#e5e7eb'};
    color: ${(props) => props.theme.text || '#374151'};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.hoverBg || '#f3f4f6'};
    }
  `,
  ghost: css`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.text || '#374151'};

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.hoverBg || '#f3f4f6'};
    }
  `,
  link: css`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.primary || '#3b82f6'};
    padding: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  ${baseButtonStyles}
  ${(props) => sizeStyles[props.size || 'md']}
  ${(props) => variantStyles[props.variant || 'default']}
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledAnchor = styled.a<ButtonProps>`
  ${baseButtonStyles}
  ${(props) => sizeStyles[props.size || 'md']}
  ${(props) => variantStyles[props.variant || 'default']}
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

//
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  asChild,
  href,
  ...props
}) => {
  if (asChild && href) {
    return (
      <StyledAnchor href={href} variant={variant} size={size} {...props}>
        {children}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};
