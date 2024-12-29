import { memo } from 'react';
import styled from 'styled-components';
import { DeleteCircle } from '@/assets/icons';

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
      <CategoryInput
        type="text"
        value={category.category}
        onChange={(e) => isEditing && onEdit(category.id, e.target.value)}
        maxLength={11}
        autoFocus={isEditing}
        onBlur={isEditing ? onBlur : undefined}
        onKeyPress={isEditing ? onKeyPress : undefined}
        readOnly={!isEditing}
        $isEditing={isEditing}
      />
      {isEditing && !isNew && (
        <DeleteBtn onClick={() => onDelete(category.id)} />
      )}
    </CategoryItemWrapper>
  ),
);

export default CategoryItem;

const CategoryItemWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 1.3rem;
  border: 1px solid white;
  border-radius: 1.25rem;
  flex-shrink: 0;
`;

const CategoryInput = styled.input`
  ${({ theme }) => theme.font.category}
  width: ${(props) => `${props.value.length + 7}ch`};
  text-align: center;
  border: none;
  outline: none;
  background: transparent;
  color: ${(props) => (props.$isEditing ? '#bebebe' : 'white')};
  cursor: ${(props) => (props.$isEditing ? 'text' : 'default')};

  &:read-only {
    pointer-events: none;
  }
`;

const DeleteBtn = styled(DeleteCircle)`
  position: absolute;
  width: 1.6rem;
  top: -0.5rem;
  right: -0.5rem;
  cursor: pointer;
`;
