import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirection = () => {
  const navigate = useNavigate();
  const processedRef = useRef(false);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const kakaoLogin = async () => {
      try {
        if (processedRef.current) return;
        processedRef.current = true;

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/accounts/kakao/login/callback/`,
          {
            params: { code },
          },
        );

        const { data } = response.data;

        if (data) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('id', data.id);

          if (data.exist) {
            navigate(`/home/${data.id}`, { replace: true });
          } else {
            navigate('/signup', {
              state: { step: 'onboarding' },
              replace: true,
            });
          }
        }
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        console.error('에러 상세:', error.response?.data);

        navigate('/', { replace: true });
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [navigate]);
};

export default KakaoRedirection;
