import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthLayout from '@auth/components/AuthLayout';
import NotiItem from './components/NotiItem';
import axios from 'axios';
import TopMenu from '@/common/TopMenu';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/alarms/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        setNotifications(response.data.data);
      } catch (error) {
        console.error('알람 불러오기 실패: ', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <AuthLayout title="Ding Dong -!">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotiItem key={notification.id} notification={notification} />
        ))
      ) : (
        <EmptyText>No notifications yet!</EmptyText>
      )}
      <TopMenu />
    </AuthLayout>
  );
};

export default Notifications;

const EmptyText = styled.p`
  ${({ theme }) => theme.font.common_detail};
  text-align: center;
`;
