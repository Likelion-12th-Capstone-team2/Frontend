import { useState, useCallback } from 'react';
import { categoryAPI } from '@/api/categoryAPI';

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editedCategories, setEditedCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const data = await categoryAPI.getCategories();
      setCategories(data);
      setEditedCategories(data);
    } catch (error) {
      console.error('카테고리 불러오기 실패:', error);
    }
  }, []);

  const addCategory = async (newCategory) => {
    if (!newCategory || categories.length >= 7) return false;

    try {
      const data = await categoryAPI.addCategory(newCategory);
      setCategories((prev) => [...prev, data]);
      setEditedCategories((prev) => [...prev, data]);
      return true;
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
      return false;
    }
  };

  const saveChanges = async () => {
    try {
      const deletedCategories = categories.filter(
        (cat) => !editedCategories.find((edited) => edited.id === cat.id),
      );

      const modifiedCategories = editedCategories.filter((edited) => {
        const original = categories.find((cat) => cat.id === edited.id);
        return original && original.category !== edited.category;
      });

      for (const cat of deletedCategories) {
        try {
          await categoryAPI.deleteCategory(cat.id);
        } catch (error) {
          if (error.message === '해당 카테고리에 아이템 존재') {
            alert('Cannot delete category that contains items!');
            await loadCategories();
            setIsEditing(false);
            return false;
          }
          throw error;
        }
      }

      for (const cat of modifiedCategories) {
        await categoryAPI.updateCategory(cat.id, cat.category);
      }

      await loadCategories();
      return true;
    } catch (error) {
      await loadCategories();
      return false;
    }
  };

  const handleEdit = (id, newValue) => {
    setEditedCategories(
      editedCategories.map((cat) =>
        cat.id === id ? { ...cat, category: newValue } : cat,
      ),
    );
  };

  const handleDelete = (categoryId) => {
    setEditedCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  return {
    categories,
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
  };
};
