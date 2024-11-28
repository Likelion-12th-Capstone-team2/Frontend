import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../fonts/font.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root{
    font-family: 'Pridi', sans-serif;
  }

  *{
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
