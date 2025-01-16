import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ categories, setSelectedCategoryId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    setCategoryCount(categories.length);
  }, [categories]);

  const selectCategory = async (category, categoryId) => {
    setSelectedCategory(category);
    setSelectedCategoryId(categoryId);
  };

  return (
    <CatagoryContainer categoryCount={categoryCount}>
      <CategoryWrapper>
        {categories.map((category) => (
          <CategoryButton
            key={category.id || 'all'}
            data-category-button
            selected={selectedCategory === category.name}
            onClick={() => selectCategory(category.name, category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryWrapper>
    </CatagoryContainer>
  );
};

export default CategoryFilter;

const CatagoryContainer = styled.div`
  width: 79%;
  min-height: 13rem;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8rem;
  @media (max-width: 60rem) {
    margin-left: 2.5rem;
  }
  @media (max-width: 48rem) {
    margin-left: 0rem;
  }
  @media (max-width: 36rem) {
    min-height: ${({ categoryCount }) =>
      categoryCount <= 4 ? '13rem' : '23rem'};
  }
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 4rem 4rem 4rem 4rem 4rem 4rem 4rem;
  grid-template-rows: auto;
  row-gap: 8rem;
  position: absolute;

  white-space: nowrap;
  @media (max-width: 60rem) {
    grid-template-columns: 4rem 4rem 4rem 4rem 4rem 4rem 4rem 4rem 4rem;
  }
  @media (max-width: 36rem) {
    grid-template-columns: 4rem 4rem 4rem 4rem;
  }
`;

const CategoryButton = styled.p`
  display: inline-block;
  padding: 0.2rem 0.525rem;
  background-color: ${({ selected }) => (selected ? 'white' : 'black')};
  color: ${({ selected }) => (selected ? 'black' : 'white')};
  cursor: pointer;
  border: none;
  width: 10rem;
  border-color: ${({ selected }) => (selected ? 'black' : 'white')};
  border: solid 1px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  ${({ theme }) => theme.font.p_category}
  transform: rotate(-90deg);

  &:hover {
    background-color: white;
    color: black;
  }
  &:active {
    background-color: white;
    color: black;
  }
`;
