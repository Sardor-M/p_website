import React from 'react';
import styled from 'styled-components';

const PortfolioContainer = styled.div`
  padding: 2rem;
`;

const Portfolio: React.FC = () => {
  return (
    <PortfolioContainer>
      <h1>Portfolio</h1>
    </PortfolioContainer>
  );
};

export default Portfolio;