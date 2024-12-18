import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Iwi } from './assets/icons';

import GlobalStyle from '@/styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import Theme from '@/styles/Theme';

import SignIn from './pages/signin/SignIn';
import WishRegister from './pages/wish/WishRegister';
import WishDetail from './pages/wish/WishDetail';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Iwi
          style={{
            width: '3.875rem',
            position: 'fixed',
            top: '2rem',
            left: '2.5rem',
          }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/wishRegister" element={<WishRegister />} />
            <Route path="/wishDetail" element={<WishDetail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
