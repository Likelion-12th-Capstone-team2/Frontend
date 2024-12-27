import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const categoryAPI = {
  getCategories: async () => {
    const response = await axios.get(
      `${BASE_URL}/mypages/category`,
      getAuthHeader(),
    );
    return response.data;
  },

  addCategory: async (category) => {
    const response = await axios.post(
      `${BASE_URL}/mypages/category/`,
      { category },
      getAuthHeader(),
    );
    return response.data;
  },

  updateCategory: async (categoryId, category) => {
    const response = await axios.patch(
      `${BASE_URL}/mypages/category/${categoryId}/`,
      { category },
      getAuthHeader(),
    );
    return response.data;
  },

  deleteCategory: async (categoryId) => {
    try {
      await axios.delete(
        `${BASE_URL}/mypages/category/${categoryId}`,
        getAuthHeader(),
      );
      return true;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('해당 카테고리에 아이템 존재');
      }
      throw error;
    }
  },
};
