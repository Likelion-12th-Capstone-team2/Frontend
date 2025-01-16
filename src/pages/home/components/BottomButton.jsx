import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BottomButton = ({
  filteredProducts,
  showDeleteIcons,
  setShowDeleteIcons,
}) => {
  const navigate = useNavigate();

  const toggleDeleteMode = () => {
    setShowDeleteIcons((prev) => !prev);
  };

  return (
    <BottomWrapper>
      {filteredProducts.length === 0 ? (
        <button onClick={() => navigate('/wishRegister')}>Add</button>
      ) : (
        <>
          <button onClick={toggleDeleteMode}>
            {showDeleteIcons ? 'Done' : 'Delete'}
          </button>
          <button onClick={() => navigate('/wishRegister')}>Add</button>
        </>
      )}
    </BottomWrapper>
  );
};

export default BottomButton;

const BottomWrapper = styled.div`
  position: absolute;
  right: 12rem;
  display: flex;
  padding-bottom: 10rem;
  > button {
    display: flex;
    padding: 0.25rem 1.125rem;
    justify-content: center;
    align-items: center;
    gap: 0.375rem;
    ${({ theme }) => theme.font.p_btn}
  }

  > button:nth-child(1) {
    color: white;
    background-color: black;
    margin-right: 1rem;
  }
  > button:nth-child(2) {
    color: black;
    background-color: #ffa100;
    border: none;
  }
  @media (max-width: 60rem) {
    right: 8rem;
  }
  @media (max-width: 48rem) {
    right: 2.3rem;
  }
`;
