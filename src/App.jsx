import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Content from './pages/Content';
import SignIn from './pages/SignIn';
import { AppProvider } from './context/AppContext';
import Cart from './components/Cart';
import SearchOverlay from './components/SearchOverlay';
import Toast from './components/Toast';
import './index.css';
import './styles.css';

function App() {
  return (
    <AppProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <div className="app-container">
            <Header />
            <SearchOverlay />
            <Cart />
            <Toast />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<Content />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </AppProvider>
  );
}

export default App;
