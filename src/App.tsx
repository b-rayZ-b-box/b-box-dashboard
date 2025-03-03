import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './components/layout/Dashboard';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0 });
    document.querySelector('html')!.style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/fintech" element={<Fintech />} />
        <Route path="/ecommerce/customers" element={<Customers />} /> */}
      </Routes>
    </>
  );
}

export default App;
