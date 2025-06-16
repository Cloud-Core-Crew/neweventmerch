import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Merch = () => {
    const [merch, setMerch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Sample data for demonstration
        const sampleMerch = [
            {
                _id: '1',
                name: 'Event T-Shirt',
                price: 25,
                imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
                description: 'Official Event T-Shirt, 100% cotton.'
            },
            {
                _id: '2',
                name: 'VIP Lanyard',
                price: 10,
                imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                description: 'VIP Access Lanyard for all events.'
            },
            {
                _id: '3',
                name: 'Event Cap',
                price: 15,
                imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
                description: 'Limited edition event cap.'
            }
        ];
        setTimeout(() => {
            setMerch(sampleMerch);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Loading merchandise...</div>;
    if (error) return <div style={{color:'#e50914',textAlign:'center',marginTop:'2rem'}}>Error: {error}</div>;

    return (
        <div style={{maxWidth:'900px',margin:'2rem auto'}}>
            <h1 style={{fontSize:'2.5rem',fontWeight:900,letterSpacing:2,marginBottom:'1.5rem'}}>Merchandise</h1>
            <div className="carousel">
                {merch.map((item, idx) => (
                    <motion.div
                        className="carousel-item"
                        key={item._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #e5091440' }}
                        onClick={() => window.alert(`Merch details for: ${item.name}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h2 style={{color:'#e50914'}}>{item.name}</h2>
                        {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{width:'100%',borderRadius:8,marginBottom:8}} />}
                        <p style={{fontWeight:600}}>${item.price}</p>
                        <p>{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Merch;