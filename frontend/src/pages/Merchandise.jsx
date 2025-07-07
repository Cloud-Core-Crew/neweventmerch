import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import AppHeader from '../components/AppHeader';

const Merchandise = () => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Sample data for demonstration
    const sampleMerch = [
      { _id: 'm1', name: 'T-Shirt', price: 25, description: 'Premium cotton event T-shirt.' },
      { _id: 'm2', name: 'Mug', price: 12, description: 'Ceramic mug with event logo.' },
      { _id: 'm3', name: 'Cap', price: 18, description: 'Stylish event cap.' },
    ];
    setTimeout(() => {
      setMerch(sampleMerch);
      setLoading(false);
    }, 800);
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addItem({ ...item, type: 'merch' }));
  };

  if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Loading merchandise...</div>;

  return (
    <>
      <AppHeader />
      <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Merchandise</h1>
        <div className="carousel">
          {merch.map((item, idx) => (
            <motion.div
              className="carousel-item"
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #e5091440' }}
              style={{ cursor: 'default', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h2 style={{ color: '#e50914' }}>{item.name}</h2>
              <p style={{ fontWeight: 600 }}>${item.price}</p>
              <p>{item.description}</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                style={{marginTop:12,background:'#e50914',color:'#fff',border:'none',borderRadius:4,padding:'0.5rem 1.5rem',fontWeight:700,cursor:'pointer', zIndex: 2}}
              >Add to Cart</button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Merchandise;
