import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useMypage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inOnboarding = pathname.includes('signup');

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [color, setColor] = useState('');
  const [typo, setTypo] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);

  useEffect(() => {
    if (!inOnboarding) {
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/mypages/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      const { setting } = data;
      setName(setting.name);
      setPreview(
        `${process.env.REACT_APP_BASE_URL}${setting.background_photo}`,
      );
      setColor(setting.color);
      setTypo(setting.typography);
    } catch (error) {
      console.error('프로필 불러오기 실패: ', error);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateFields = () => {
    const nameValid = name.length > 0 && name.length <= 7;
    setIsNameValid(nameValid);
    if (!nameValid) return false;

    if (!preview || !color || !typo) {
      alert('Please fill out all fields!');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('name', name);
    if (photo) formData.append('background_photo', photo);
    formData.append('color', color);
    formData.append('typography', typo);

    try {
      const endpoint = `${process.env.REACT_APP_BASE_URL}/mypages/`;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      if (inOnboarding) {
        await axios.post(endpoint, formData, config);
      } else {
        await axios.patch(endpoint, formData, config);
      }

      navigate('/home');
    } catch (error) {
      console.error('프로필 설정 실패:', error);
    }
  };

  return {
    name,
    setName,
    preview,
    isNameValid,
    color,
    setColor,
    typo,
    setTypo,
    handlePhotoUpload,
    handleSubmit,
  };
};
