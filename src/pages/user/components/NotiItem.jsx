import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotiItem = ({ notification }) => {
  const navigate = useNavigate();
  const { sender, date, item } = notification;

  const handleClick = () => {
    navigate('/wishDetail', {
      state: { itemId: item },
    });
  };

  return (
    <ItemWrapper onClick={handleClick}>
      <Title>Ding!</Title>
      <Message>
        You've got a gift from {sender}!<br />
        See what's inside! →
      </Message>
      <DateText>
        {new Date(date)
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\//g, '.')}
      </DateText>
    </ItemWrapper>
  );
};

export default NotiItem;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  padding: 0.75rem 1.125rem;
  background-color: black;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.font.common_text};
`;

const Message = styled.p`
  ${({ theme }) => theme.font.common_input};
`;

const DateText = styled.span`
  ${({ theme }) => theme.font.category};
  color: ${({ theme }) => theme.color.orange};
`;
