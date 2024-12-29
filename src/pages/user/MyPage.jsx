import { useState } from 'react';
import AuthLayout from '@auth/components/AuthLayout';
import Onboarding from '@auth/components/Onboarding';
import Category from './components/Category';
import TopMenu from '@/common/TopMenu';
import SideBar from '@/common/SideBar';

const Mypage = () => {
  const [activeTitle, setActiveTitle] = useState('Setting');
  const loggedInUserId = localStorage.getItem('id');

  return (
    <AuthLayout
      title={['Setting', 'Category']}
      activeTitle={activeTitle}
      onTitleClick={setActiveTitle}
    >
      {activeTitle === 'Setting' ? <Onboarding /> : <Category />}
      <TopMenu loginUser={loggedInUserId} />
      <SideBar loginUser={loggedInUserId} />
    </AuthLayout>
  );
};

export default Mypage;
