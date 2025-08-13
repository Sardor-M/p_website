import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { themeColor } from '@/themes/color';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
};

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a' | typeof Link;
};

export type ButtonProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    asChild?: boolean;
    href?: string;
    fullWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    to?: string;
} & (ButtonAsButton | ButtonAsAnchor);

const baseButtonStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    font-family: inherit;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px
            ${({ theme }) =>
                theme.mode === 'dark'
                    ? themeColor.primary.dark + '40'
                    : themeColor.primary.light + '40'};
    }
`;

const sizeStyles = {
    xs: css`
        padding: 0.375rem 0.625rem;
        font-size: 0.75rem;
        gap: 0.375rem;
    `,
    sm: css`
        padding: 0.5rem 0.875rem;
        font-size: 0.875rem;
        gap: 0.5rem;
    `,
    md: css`
        padding: 0.625rem 1.125rem;
        font-size: 0.9375rem;
        gap: 0.625rem;
    `,
    lg: css`
        padding: 0.75rem 1.5rem;
        font-size: 1.0625rem;
        gap: 0.75rem;
    `,
    xl: css`
        padding: 1rem 2rem;
        font-size: 1.125rem;
        gap: 1rem;
    `,
};

const variantStyles = {
    primary: css`
        background: ${themeColor.button.primary.bg};
        color: ${themeColor.button.primary.text};
        border: 1px solid ${themeColor.button.primary.border};
        box-shadow: ${themeColor.shadow.sm};

        &:hover:not(:disabled) {
            background: ${themeColor.button.primary.bgHover};
            transform: translateY(-1px);
            box-shadow: ${themeColor.shadow.md};
        }

        &:active:not(:disabled) {
            background: ${themeColor.button.primary.bgActive};
            transform: translateY(0);
        }
    `,

    secondary: css`
        background: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.button.secondary.bgDark
                : themeColor.button.secondary.bgLight};
        color: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.button.secondary.textDark
                : themeColor.button.secondary.textLight};
        border: 1px solid
            ${({ theme }) =>
                theme.mode === 'dark' ? themeColor.border.dark : themeColor.border.light};

        &:hover:not(:disabled) {
            background: ${({ theme }) =>
                theme.mode === 'dark'
                    ? themeColor.button.secondary.bgHoverDark
                    : themeColor.button.secondary.bgHoverLight};
            transform: translateY(-1px);
        }

        &:active:not(:disabled) {
            transform: translateY(0);
        }
    `,

    outline: css`
        background: transparent;
        border: 1.5px solid
            ${({ theme }) =>
                theme.mode === 'dark'
                    ? themeColor.button.outline.borderDark
                    : themeColor.button.outline.borderLight};
        color: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.button.outline.textDark
                : themeColor.button.outline.textLight};

        &:hover:not(:disabled) {
            background: ${({ theme }) =>
                theme.mode === 'dark'
                    ? themeColor.button.outline.bgHoverDark
                    : themeColor.button.outline.bgHoverLight};
            border-color: ${({ theme }) =>
                theme.mode === 'dark' ? themeColor.neutral[600] : themeColor.neutral[400]};
        }
    `,

    ghost: css`
        background: transparent;
        border: 1px solid transparent;
        color: ${({ theme }) =>
            theme.mode === 'dark'
                ? themeColor.button.ghost.textDark
                : themeColor.button.ghost.textLight};

        &:hover:not(:disabled) {
            background: ${({ theme }) =>
                theme.mode === 'dark'
                    ? themeColor.button.ghost.bgHoverDark
                    : themeColor.button.ghost.bgHoverLight};
        }
    `,

    danger: css`
        background: ${themeColor.error.main};
        color: white;
        border: 1px solid transparent;

        &:hover:not(:disabled) {
            background: ${themeColor.error.hover};
            transform: translateY(-1px);
            box-shadow: ${themeColor.shadow.md};
        }

        &:active:not(:disabled) {
            background: ${themeColor.error.active};
            transform: translateY(0);
        }
    `,

    success: css`
        background: ${themeColor.success.main};
        color: white;
        border: 1px solid transparent;

        &:hover:not(:disabled) {
            background: ${themeColor.success.hover};
            transform: translateY(-1px);
            box-shadow: ${themeColor.shadow.md};
        }

        &:active:not(:disabled) {
            background: ${themeColor.success.active};
            transform: translateY(0);
        }
    `,
};

const StyledButton = styled.button<Omit<ButtonProps, 'as'>>`
    ${baseButtonStyles}
    ${(props) => sizeStyles[props.size || 'md']}
    ${(props) => variantStyles[props.variant || 'primary']}
    ${(props) =>
        props.fullWidth &&
        css`
            width: 100%;
        `}
    ${(props) =>
        props.isLoading &&
        css`
            color: transparent;
            pointer-events: none;

            &::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                margin: auto;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                animation: spin 0.6s linear infinite;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `}
`;

const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
`;

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    asChild,
    href,
    isLoading,
    leftIcon,
    rightIcon,
    to,
    ...props
}: ButtonProps) {
    const content = (
        <>
            {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
            {children}
            {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
        </>
    );

    if (to) {
        return (
            <StyledButton as={Link} to={to} variant={variant} size={size} {...props}>
                {content}
            </StyledButton>
        );
    }

    if (asChild && href) {
        return (
            <StyledButton as="a" href={href} variant={variant} size={size} {...props}>
                {content}
            </StyledButton>
        );
    }

    return (
        <StyledButton variant={variant} size={size} isLoading={isLoading} {...props}>
            {content}
        </StyledButton>
    );
}
