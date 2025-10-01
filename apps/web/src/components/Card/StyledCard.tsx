import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { cardSizes, cardPadding, cardVariants } from '@/components/Card/CardStyles';
import { CardPadding, CardSize, CardVariant } from '@/components/Card/CardTypes';
import { useTranslation } from 'react-i18next';
import { themeColor } from '@/themes/color';

export type CardStyleConfig = {
    variant: CardVariant;
    size?: CardSize;
    padding?: CardPadding;
    hoverable?: boolean;
    bordered?: boolean;
    styles?: {
        header?: React.CSSProperties;
        body?: React.CSSProperties;
    };
};

export type CardContentConfig = {
    title?: string;
    subtitle?: string;
    titleKey?: string;
    subtitleKey?: string;
    extra?: React.ReactNode;
};

export type CardTagConfig = {
    tags?: string[];
    onTagClick?: (tag: string) => void;
};

export type CardProps = {
    style?: CardStyleConfig;
    content?: CardContentConfig;
    tags?: CardTagConfig;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

export type CardContainerProps = {
    variant: CardVariant;
    size: CardSize;
    padding: CardPadding;
    $hoverable: boolean;
    $bordered: boolean;
};

const getCardShadow = ({ theme }: { theme: DefaultTheme }) => css`
    ${theme.mode === 'dark'
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.6)'
        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}
`;

const hoverStyles = css`
    transform: translateY(-4px);
    box-shadow: ${getCardShadow};
`;

const CardContainer = styled.div<CardContainerProps>`
    border-radius: 15px;
    width: 100%;
    margin: 6px 0;
    overflow: hidden;

    ${({ variant }) => cardVariants[variant]};
    ${({ size }) => cardSizes[size]};
    ${({ padding }) => cardPadding[padding]};

    transition:
        transform 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;

    ${({ $hoverable }) =>
        $hoverable &&
        css`
            &:hover {
                ${hoverStyles}
            }
        `}
`;

const CardHeader = styled.div<{ $bordered: boolean }>`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${({ $bordered }) => ($bordered ? `1px solid ${themeColor.border}` : 'none')};
`;

const CardTitle = styled.h3`
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
`;

const CardBody = styled.div`
    padding: 1rem;

    ${themeColor.breakpoints.mobile} {
        padding: 0.75rem;
    }
`;

const CardSubtitle = styled.h4`
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.5;
`;

const TagList = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    flex-wrap: wrap;
`;

const Tag = styled.span`
    padding: 0.2rem 0.65rem;
    font-size: 0.65rem;
    border-radius: 5px;
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#2D2D2D' : 'rgb(235, 235, 235)')};
    color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#000000')};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) =>
            theme.mode === 'dark' ? '#3D3D3D' : 'rgb(225, 225, 225)'};
    }

    ${themeColor.breakpoints.mobile} {
        padding: 0.15rem 0.5rem;
        font-size: 0.6rem;
    }
`;

export default function StyledCard({
    style = {
        variant: 'elevated',
        size: 'md',
        padding: 'md',
        hoverable: false,
        bordered: true,
    },
    content = {},
    tags: tagConfig = {},
    children,
    className,
    ...rest
}: CardProps) {
    const { t } = useTranslation();

    return (
        <CardContainer
            variant={style.variant}
            size={style.size ?? 'md'}
            padding={style.padding ?? 'md'}
            $hoverable={style.hoverable ?? false}
            $bordered={style.bordered ?? true}
            {...rest}
        >
            {(content.title || content.extra) && (
                <CardHeader style={style.styles?.header} $bordered={style.bordered ?? true}>
                    <div>
                        {content.titleKey ? (
                            <CardTitle>{t(content.titleKey)}</CardTitle>
                        ) : (
                            content.title && <CardTitle>{content.title}</CardTitle>
                        )}
                        {content.subtitleKey ? (
                            <CardSubtitle>{t(content.subtitleKey)}</CardSubtitle>
                        ) : (
                            content.subtitle && <CardSubtitle>{content.subtitle}</CardSubtitle>
                        )}
                    </div>
                    {content.extra && <div>{content.extra}</div>}
                </CardHeader>
            )}
            <CardBody style={style.styles?.body}>
                {children}
                {tagConfig.tags && tagConfig.tags.length > 0 && (
                    <TagList>
                        {tagConfig.tags.map((tag, index) => (
                            <Tag
                                key={`tag-${index}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    tagConfig.onTagClick?.(tag);
                                }}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </TagList>
                )}
            </CardBody>
        </CardContainer>
    );
}

/**
 * we only use when we need to create
 * a card with default props
 */
export const cardPresets = {
    blogPost: {
        variant: 'elevated' as CardVariant,
        size: 'md' as CardSize,
        padding: 'lg' as CardPadding,
        hoverable: true,
        bordered: false,
    },
    dashboard: {
        variant: 'gray' as CardVariant,
        size: 'sm' as CardSize,
        padding: 'md' as CardPadding,
        hoverable: true,
        bordered: false,
    },
    feature: {
        variant: 'light' as CardVariant,
        size: 'md' as CardSize,
        padding: 'lg' as CardPadding,
        hoverable: true,
        bordered: false,
    },
};
