
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FaviconHealthMonitor from '../favicon/FaviconHealthMonitor';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FaviconHealthMonitor />
    </div>
  );
};

export default MainLayout;
