import React from "react";
import styled, { css } from "styled-components";
import { cardSizes, cardPadding, cardVariants } from "./CardStyles";
import { CardPadding, CardSize, CardVariant } from "./CardTypes";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  padding?: CardPadding;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  onClick?: () => void;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  extra?: React.ReactNode;
};


const CardContainer = styled.div<{
  $variant: CardVariant;
  $size: CardSize;
  $padding: CardPadding;
  $hoverable: boolean;
  $bordered: boolean;
}>`
  ${({ $variant }) => cardVariants[$variant]};
  ${({ $size }) => cardSizes[$size]};
  ${({ $padding }) => cardPadding[$padding]};


  border-radius: 15px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  overflow: hidden;
  width: 100%;
  margin: 10px 0;

  ${({ $hoverable }) =>
    $hoverable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) =>
          theme.mode === "dark"
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.6)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"};
      }
    `}
`;

const CardHeader = styled.div<{ $bordered: boolean }>`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ $bordered, theme }) =>
    $bordered ? `1px solid ${theme.borderColor}` : "none"};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const StyledCard: React.FC<CardProps> = ({
  title,
  children,
  variant = "elevated",
  size = "md",
  padding = "md",
  hoverable = false,
  bordered = true,
  className,
  onClick,
  headerStyle,
  bodyStyle,
  extra,
}) => {
  return (
    <CardContainer
      $variant={variant}
      $size={size}
      $padding={padding}
      $hoverable={hoverable}
      $bordered={bordered}
      className={className}
      onClick={onClick}
    >
      {(title || extra) && (
        <CardHeader style={headerStyle} $bordered={bordered}>
          {title && <CardTitle>{title}</CardTitle>}
          {extra && <div>{extra}</div>}
        </CardHeader>
      )}
      <CardBody style={bodyStyle}>{children}</CardBody>
    </CardContainer>
  );
};

// predefined card configs 
// this is i think not bvery smart way to do so 
export const cardPresets = {
  blogPost: {
    variant: "elevated" as CardVariant,
    size: "md" as CardSize,
    padding: "lg" as CardPadding,
    hoverable: true,
    bordered: false,
  },
  dashboard: {
    variant: "gray" as CardVariant,
    size: "sm" as CardSize,
    padding: "md" as CardPadding,
    hoverable: true,
    bordered: false,
  },
  feature: {
    variant: "light" as CardVariant,
    size: "md" as CardSize,
    padding: "lg" as CardPadding,
    hoverable: true,
    bordered: false,
  },
};

export default StyledCard;
