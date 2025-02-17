import React from 'react';
import styled from 'styled-components';
import { Card as AntdCard } from 'antd';

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const StyledCard = styled(AntdCard)`
  background-color: ${({ theme }) => theme.cardBg} !important;
  color: ${({ theme }) => theme.textColor};
  border-radius: 8px;
`;

const Card: React.FC<CardProps> = ({ title, children }) => {
  return <StyledCard title={title}>{children}</StyledCard>;
};

export default Card;
