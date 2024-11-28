import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GlobalStyle from './styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/Theme';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes></Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
