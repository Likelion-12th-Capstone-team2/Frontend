import { useRef } from 'react';
import styled from 'styled-components';
import AuthInput from './AuthInput';
import { PlusSquare } from '@/assets/icons';
import { useMypage } from '@/hooks/useMyPage';

const Onboarding = () => {
  const nameRef = useRef(null);
  const {
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
  } = useMypage();

  const colors = ['#FEF78C', '#FFA100', '#FF5356', '#0C4CFF', '#6D29FF'];
  const typos = ['Pridi', 'Pretendard', 'Gothic A1', 'Gowun Batang'];

  return (
    <>
      <AuthInput
        ref={nameRef}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isValid={isNameValid}
        errorText="You can enter up to 7 letters."
      />

      {/* 사진 업로드 및 변경 */}
      <Section>
        <Label>Background Photo</Label>
        {preview ? (
          <PhotoLabel>
            <PreviewBox>
              <Preview src={preview} alt="photo preview" />
              <EditBtn>Edit</EditBtn>
            </PreviewBox>
            <HiddenInput
              type="file"
              onChange={handlePhotoUpload}
              accept="image/*"
            />
          </PhotoLabel>
        ) : (
          <PhotoLabel>
            <PlusSquare style={{ width: '2.75rem' }} />
            <HiddenInput
              type="file"
              onChange={handlePhotoUpload}
              accept="image/*"
            />
          </PhotoLabel>
        )}
      </Section>

      {/* 컬러 선택 */}
      <Section>
        <Label>Your Color</Label>
        {colors.map((c) => (
          <ColorButton
            key={c}
            $color={c}
            $isSelected={color === c}
            onClick={() => setColor(c)}
          />
        ))}
      </Section>

      {/* 폰트 선택 */}
      <Section>
        <Label>typography</Label>
        {typos.map((t, index) => (
          <TypeButton
            key={t}
            $typo={t}
            $index={index}
            $isSelected={typo === t}
            onClick={() => setTypo(t)}
          >
            {index < 2 ? `Aa` : `가나다`}
          </TypeButton>
        ))}
      </Section>

      <DoneButton onClick={handleSubmit}>Done</DoneButton>
    </>
  );
};

export default Onboarding;

const Label = styled.p`
  ${({ theme }) => theme.font.common_detail};
  margin-bottom: 0.4rem;
`;

const Section = styled.div`
  margin-bottom: 0.88rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PhotoLabel = styled.label`
  cursor: pointer;
`;

const PreviewBox = styled.div`
  position: relative;
  width: 9rem;
  height: 9rem;
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditBtn = styled.div`
  ${({ theme }) => theme.font.common_detail_kor}
  text-align: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.45rem;
  background-color: white;
  color: black;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  ${PreviewBox}:hover & {
    background-color: #ff0000;
    color: white;
  }
`;

const ColorButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${(props) => props.$color};
  box-shadow: ${(props) =>
    props.$isSelected ? 'inset 0 0 0 3px black' : 'none'};
  border: none;
  margin-right: 0.625rem;

  ${({ theme }) => theme.mobile} {
    margin: 0 0.625rem 0.625rem 0;
  }
`;

const TypeButton = styled.button`
  all: unset;
  font-family: ${(props) => props.$typo};
  font-size: 2rem;
  margin-right: 1.47rem;
  font-weight: ${(props) => (props.$index < 2 ? `600` : `400`)};
  text-decoration: ${(props) => (props.$isSelected ? 'underline' : 'none')};

  ${({ theme }) => theme.mobile} {
    margin: 0 1.47rem 0.625rem 0;
  }
`;

const DoneButton = styled.div`
  ${({ theme }) => theme.font.m_btn};
  width: fit-content;
  padding: 0.25rem 0.75rem;
  margin: 3.24rem auto 0;
  background-color: black;
  cursor: pointer;
`;
