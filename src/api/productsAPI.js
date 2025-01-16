import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getfetchDataHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const productsAPI = {
  fetchProducts: async (userId, selectedPrice, selectedCategoryId) => {
    try {
      const params = new URLSearchParams();
      if (selectedPrice !== null && selectedPrice !== undefined) {
        params.append('price', selectedPrice);
      }
      if (selectedCategoryId !== null && selectedCategoryId !== undefined) {
        params.append('category', selectedCategoryId);
      }
      const response = await axios.get(
        `${BASE_URL}/wish/${userId || 'guest'}/?${params.toString()}`,
        getfetchDataHeader(),
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.error('Resource not found:', error);
        alert('Requested resource not found. Please check the URL or user ID.');
      } else {
        console.error('Failed to fetch data:', error);
        alert('Failed to load user information. Please try again later.');
      }
    }
  },

  fetchProductDetail: async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/wish/items/${productId}/`,
        getfetchDataHeader(),
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      alert('Failed to fetch product information.');
    }
  },

  deleteProduct: async (productToDelete) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/wish/items/${productToDelete.id}/`,
        getfetchDataHeader(),
      );
      return true;
    } catch (error) {}
  },
};
