import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Iwi } from '@/assets/icons';

import GlobalStyle from '@/styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import Theme from '@/styles/Theme';

import LogIn from '@auth/LogIn';
import SignUp from '@auth/SignUp';
import Home from '@/pages/home/Home';
import WishRegister from '@/pages/wish/WishRegister';
import WishDetail from '@/pages/wish/WishDetail';

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
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/wishRegister" element={<WishRegister />} />
            <Route path="/wishDetail" element={<WishDetail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
