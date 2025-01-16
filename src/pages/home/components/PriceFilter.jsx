import React from 'react';
import styled from 'styled-components';

const PriceFilter = ({ selectedPrice, setSelectedPrice }) => {
  const selectPrice = (price) => {
    setSelectedPrice(price);
  };

  return (
    <PriceWrapper>
      <Price
        data-price-button
        selected={selectedPrice === 0}
        onClick={() => selectPrice(0)}
      >
        ~30,000
      </Price>
      <Price
        data-price-button
        selected={selectedPrice === 30000}
        onClick={() => selectPrice(30000)}
      >
        30,000~50,000
      </Price>
      <Price
        data-price-button
        selected={selectedPrice === 50000}
        onClick={() => selectPrice(50000)}
      >
        50,000~100,000
      </Price>
      <Price
        data-price-button
        selected={selectedPrice === 100000}
        onClick={() => selectPrice(100000)}
      >
        100,000~
      </Price>
    </PriceWrapper>
  );
};

export default PriceFilter;

const Price = styled.div`
  ${({ theme }) => theme.font.p_numBtn}
  border-radius: 3.125rem;
  border: 1px solid #000;
  display: inline-block;
  background-color: ${({ selected }) => (selected ? 'white' : 'black')};
  color: ${({ selected }) => (selected ? 'black' : 'white')};
  cursor: pointer;
  margin-right: 0.8rem;
  margin-top: 1rem;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const PriceWrapper = styled.div`
  margin-left: 11rem;
  margin-top: 0.6rem;
  @media (max-width: 60rem) {
    margin-left: 5rem;
  }
  @media (max-width: 48rem) {
    margin-left: 3rem;
  }
`;
