import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/accounts/kakao/login/callback/?code=${code}`,
        );

        console.log('카카오 로그인 응답:', response);
        const { data } = response.data;

        if (data) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('id', data.id);
          navigate('/signup', { state: { step: 'onboarding' } });
        }
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
        console.error('에러 응답:', error.response?.data);
        navigate('/');
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [navigate]);

  return <div>로그인 처리중입니다...</div>;
};

export default KakaoRedirection;
