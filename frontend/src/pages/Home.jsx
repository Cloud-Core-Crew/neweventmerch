import React from 'react';
import { motion } from 'framer-motion';

const Home = () => (
  <div style={{ maxWidth: '900px', margin: '2rem auto', textAlign: 'center' }}>
    <motion.h1
      style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem', color: '#e50914' }}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Welcome to EventMerch
    </motion.h1>
    <motion.p
      style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '2rem' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      Discover exclusive events and official merchandise
    </motion.p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <motion.div
        className="carousel-item"
        style={{ minWidth: 300 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #e5091440' }}
      >
        <h2 style={{ color: '#e50914' }}>Events</h2>
        <p>Browse and join the latest events.</p>
      </motion.div>
      <motion.div
        className="carousel-item"
        style={{ minWidth: 300 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #e5091440' }}
      >
        <h2 style={{ color: '#e50914' }}>Merchandise</h2>
        <p>Shop exclusive event merch.</p>
      </motion.div>
    </div>
  </div>
);

export default Home;