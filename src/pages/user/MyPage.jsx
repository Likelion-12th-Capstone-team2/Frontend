import { useState } from 'react';
import AuthLayout from '@auth/components/AuthLayout';
import Onboarding from '@auth/components/Onboarding';
import Category from './components/Category';
import TopMenu from '@/common/TopMenu';

const Mypage = () => {
  const [activeTitle, setActiveTitle] = useState('Setting');

  return (
    <AuthLayout
      title={['Setting', 'Category']}
      activeTitle={activeTitle}
      onTitleClick={setActiveTitle}
    >
      {activeTitle === 'Setting' ? <Onboarding /> : <Category />}
      <TopMenu />
    </AuthLayout>
  );
};

export default Mypage;
