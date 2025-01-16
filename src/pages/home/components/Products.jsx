import styled from 'styled-components';
import HeartFull from '@/assets/Frame 336.svg';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@/assets/icons';

const Products = ({
  showDeleteIcons,
  filteredProducts,
  fetchProductDetails,
  setShowPopup,
  showPopup,
}) => {
  const navigate = useNavigate();

  const handleDeleteClick = (productId) => {
    fetchProductDetails(productId);
    setShowPopup(true);
    console.log(showPopup);
  };

  return (
    <ProductGrid>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} style={{ position: 'relative' }}>
            <ProductCard
              received={product.is_sended}
              onClick={() => {
                if (showDeleteIcons) {
                  handleDeleteClick(product.id);
                } else {
                  navigate('/wishDetail', {
                    state: { itemId: product.id },
                  });
                }
              }}
            >
              <ProductImage
                src={product.item_image}
                alt={`Product ${product.id}`}
              />
              {product.is_sended ? (
                <ReceivedOverlay>
                  <Text>Received</Text>
                </ReceivedOverlay>
              ) : (
                <ShadowOverlay />
              )}
              <HeartContainer received={product.is_sended}>
                {Array(product.heart)
                  .fill(null)
                  .map((_, index) => (
                    <Heart key={index}>
                      <img
                        src={HeartFull}
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                        }}
                        alt="Heart Icon"
                      />
                    </Heart>
                  ))}
              </HeartContainer>
            </ProductCard>
            {showDeleteIcons && (
              <Delete
                style={{
                  position: 'absolute',
                  top: '0.3rem',
                  right: '0.3rem',
                  zIndex: 100,
                  cursor: 'pointer',
                }}
                onClick={() => handleDeleteClick(product.id)}
              />
            )}
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ProductGrid>
  );
};

export default Products;

const ProductGrid = styled.div`
  display: grid;
  max-width: 90.5rem;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 13rem));
  grid-auto-rows: 16.25rem;
  gap: 1rem;
  margin: 2rem;
  margin-left: 11.3rem;
  margin-right: 11rem;
  @media (max-width: 60rem) {
    margin-left: 5rem;
  }
  @media (max-width: 48rem) {
    margin-left: 3.4rem;
  }
`;

const ReceivedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
const Text = styled.p`
  transform: rotate(-30deg);
  ${({ theme }) => theme.font.m_home_received}
`;

const ProductCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ShadowOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  pointer-events: none;
`;

const HeartContainer = styled.div`
  margin-top: 0.5rem;
  text-align: end;
  z-index: 100;
  position: absolute;
  right: 0.5rem;
  bottom: 0.3rem;
  display: ${({ received }) => (received ? 'none' : 'block')};
`;

const Heart = styled.span``;
