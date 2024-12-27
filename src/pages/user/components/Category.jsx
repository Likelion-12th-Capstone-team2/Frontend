import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCategory } from '@/hooks/useCategory';
import CategoryItem from './CategoryItem';

const Category = () => {
  const {
    editedCategories,
    isEditing,
    showInput,
    setIsEditing,
    setShowInput,
    loadCategories,
    addCategory,
    saveChanges,
    handleEdit,
    handleDelete,
  } = useCategory();

  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleAddButtonClick = () => {
    if (editedCategories.length >= 7) {
      return;
    }
    setShowInput(true);
  };

  const handleAddCategory = async () => {
    if (!newCategory) {
      setShowInput(false);
      return;
    }

    const success = await addCategory(newCategory);
    if (success) {
      setNewCategory('');
      setShowInput(false);
    }
  };

  const handleDone = async () => {
    if (newCategory && showInput) {
      await handleAddCategory();
    }

    const success = await saveChanges();
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <>
      <Title>Wish Category</Title>
      <CategoryList>
        {editedCategories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isEditing={isEditing}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {!showInput && !isEditing && editedCategories.length < 7 && (
          <AddButton onClick={handleAddButtonClick}>+</AddButton>
        )}
        {showInput && (
          <CategoryItem
            category={{ id: 'new', category: newCategory }}
            isEditing={true}
            onEdit={(_, value) => setNewCategory(value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCategory();
              }
            }}
            onBlur={handleAddCategory}
            isNew={true}
          />
        )}
      </CategoryList>
      <EditButton onClick={isEditing ? handleDone : () => setIsEditing(true)}>
        {isEditing ? 'Done' : 'Edit'}
      </EditButton>
    </>
  );
};

export default Category;

const Title = styled.h2`
  ${({ theme }) => theme.font.m_common_detail};
  color: white;
  margin-bottom: 1.25rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AddButton = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  color: white;
  border: 1px solid white;
  line-height: 0cap;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  padding: 0;
`;

const EditButton = styled.button`
  ${({ theme }) => theme.font.p_btn};
  padding: 0.25rem 1.125rem;
  background-color: ${(props) =>
    props.children === 'Edit' ? props.theme.color.orange : 'black'};
  color: ${(props) => (props.children === 'Edit' ? 'black' : 'white')};
  border: none;
  cursor: pointer;
`;
