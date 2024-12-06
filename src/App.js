import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GlobalStyle from '@/styles/Globalstyle';
import { ThemeProvider } from 'styled-components';
import Theme from '@/styles/Theme';

import SignIn from './pages/signin/SignIn';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
