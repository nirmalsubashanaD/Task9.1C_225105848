import React, { useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/Tutorials';
import Footer from './components/Footer';
import EmailPart from './components/EmailPart';
import Login from '../src/pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import PostPage from './pages/QuestionList'; 


const HomePage = () => {
  const heroRef = useRef(null);
  const articlesRef = useRef(null);
  const tutorialsRef = useRef(null);

  return (
    <>
      <Header
        onArticlesClick={() => articlesRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onTutorialsClick={() => tutorialsRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      <div ref={heroRef}>
        <HeroSection scrollTargetRef={articlesRef} />
      </div>

      <div ref={articlesRef}>
        <FeaturedArticles />
      </div>

      <div ref={tutorialsRef}>
        <FeaturedTutorials />
      </div>

      <EmailPart />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
    path="/post"
    element={
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    }
  />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
