import { memo } from 'react';
import styled from 'styled-components';

const CategoryItem = memo(
  ({
    category,
    isEditing,
    onEdit,
    onDelete,
    onBlur,
    onKeyPress,
    isNew = false,
  }) => (
    <CategoryItemWrapper>
      {isEditing ? (
        <>
          <CategoryInput
            type="text"
            value={category.category}
            onChange={(e) => onEdit(category.id, e.target.value)}
            maxLength={11}
            autoFocus
            onBlur={onBlur}
            onKeyPress={onKeyPress}
          />
          {!isNew && (
            <DeleteButton onClick={() => onDelete(category.id)}>✕</DeleteButton>
          )}
        </>
      ) : (
        <CategoryText>{category.category}</CategoryText>
      )}
    </CategoryItemWrapper>
  ),
);

export default CategoryItem;

const CategoryItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.3rem 2.69rem;
  border: 1px solid white;
  border-radius: 1.25rem;
`;

const CategoryText = styled.span`
  ${({ theme }) => theme.font.category};
`;

const CategoryInput = styled.input`
  width: auto;
  ${({ theme }) => theme.font.category}
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  color: #bebebe;
`;

const DeleteButton = styled.button`
  background: ${({ theme }) => theme.color.orange};
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  line-height: 0cap;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  font-size: 0.875rem;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;
