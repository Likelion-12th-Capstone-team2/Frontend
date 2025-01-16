import { useState, useEffect } from 'react';
import { productsAPI } from '@/api/productsAPI';
import { useNavigate } from 'react-router-dom';

export const useProducts = ({ userId = null, loggedInUserId = null }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([{ name: 'All', id: null }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [settings, setSettings] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState('guest');

  const navigate = useNavigate();

  //상품 상세 보기
  const fetchProductDetails = async (productId) => {
    try {
      const data = await productsAPI.fetchProductDetail(productId);

      const item = data.item;
      const productDetails = {
        id: item.id,
        is_sended: item.is_sended || false,
        item_image: item.item_image,
        hearts: item.heart || 0,
        name: item.item_name,
        price: item.price,
        category: item.category || 'N/A',
        color: item.color || 'N/A',
        size: item.size || 'N/A',
        other_option: item.other_option || 'N/A',
      };

      setProductToDelete(productDetails);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  //상품 목록 보기
  const fetchData = async (userId) => {
    if (!userId) {
      console.warn('User ID is missing. Skipping fetch.');
      return;
    }

    try {
      const data = await productsAPI.fetchProducts(
        userId,
        selectedPrice,
        selectedCategoryId,
      );

      setSettings({
        name: data.setting?.name || '',
        backgroundPhoto: data.setting?.background_photo || '',
        color: data.setting?.color || '#fff',
        typography: data.setting?.typography || 'Arial',
      });

      const categoryList = [
        { name: 'All', id: null },
        ...(data.catagory || []).map((cat) => ({
          name: cat.category,
          id: cat.id,
        })),
      ];
      setCategories(categoryList);

      const sortedItems = (data.wish_items || []).sort(
        (a, b) => b.heart - a.heart,
      );
      setProducts(sortedItems);
      setFilteredProducts(sortedItems);

      setShowMessage(sortedItems.length === 0);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  //상품 삭제하기
  const confirmDelete = async () => {
    try {
      const success = await productsAPI.deleteProduct(productToDelete);
      if (success) {
        setProducts((prev) =>
          prev.filter((item) => item.id !== productToDelete.id),
        );
        setFilteredProducts((prev) =>
          prev.filter((item) => item.id !== productToDelete.id),
        );
        setProductToDelete(null);
        setShowPopup(false);
        alert('The product has been successfully deleted.');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  //유저 구분
  useEffect(() => {
    const token = localStorage.getItem('token');

    const User = async () => {
      if (!token) {
        setUserType('guest');
        if (!userId || userId === 'guest') {
          navigate(`/home/guest`, { replace: true });
        } else {
          if (userId) await fetchData(userId);
        }
      } else {
        if (!userId) {
          if (loggedInUserId)
            navigate(`/home/${loggedInUserId}`, { replace: true });
        } else if (userId === loggedInUserId) {
          setUserType('owner');
          if (loggedInUserId) await fetchData(loggedInUserId);
        } else {
          setUserType('viewer');
          if (userId) await fetchData(userId);
        }
      }
    };

    User();
  }, [userId, selectedPrice, selectedCategoryId, loggedInUserId]);

  return {
    products,
    filteredProducts,
    categories,
    settings,
    showMessage,
    productToDelete,
    showPopup,
    userType,
    selectedPrice,
    selectedCategoryId,
    setSelectedPrice,
    setSelectedCategoryId,
    setShowPopup,
    setProductToDelete,
    fetchProductDetails,
    confirmDelete,
  };
};
