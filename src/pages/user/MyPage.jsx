import { useState } from 'react';
import AuthLayout from '@auth/components/AuthLayout';

const Mypage = () => {
  const [activeTitle, setActiveTitle] = useState('Setting');

  return (
    <AuthLayout
      title={['Setting', 'Category']}
      activeTitle={activeTitle}
      onTitleClick={setActiveTitle}
    ></AuthLayout>
  );
};

export default Mypage;
