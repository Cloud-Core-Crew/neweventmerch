import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // Sample data for demonstration
        const sampleEvents = [
            {
                _id: '1',
                title: 'Summer Music Fest',
                date: '2025-07-15',
                description: 'Join us for a night of music, food, and fun under the stars!'
            },
            {
                _id: '2',
                title: 'Tech Innovators Conference',
                date: '2025-08-10',
                description: 'A gathering of the brightest minds in technology and innovation.'
            },
            {
                _id: '3',
                title: 'Charity Run 5K',
                date: '2025-09-01',
                description: 'Run for a cause and support local charities in our annual 5K.'
            }
        ];
        setTimeout(() => {
            setEvents(sampleEvents);
            setLoading(false);
        }, 800);
    }, []);

    const handleAddToCart = (event) => {
        dispatch(addItem({ ...event, type: 'event', price: 20 })); // Example price
    };

    if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Loading events...</div>;
    if (error) return <div style={{color:'#e50914',textAlign:'center',marginTop:'2rem'}}>Error: {error}</div>;

    return (
        <div style={{maxWidth:'900px',margin:'2rem auto'}}>
            <h1 style={{fontSize:'2.5rem',fontWeight:900,letterSpacing:2,marginBottom:'1.5rem'}}>Events</h1>
            <div className="carousel">
                {events.map((event, idx) => (
                    <motion.div
                        className="carousel-item"
                        key={event._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #e5091440' }}
                        style={{ cursor: 'default', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <h2 style={{color:'#e50914'}}>{event.title}</h2>
                        <p style={{fontWeight:600}}>{event.date}</p>
                        <p>{event.description}</p>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(event); }}
                            style={{marginTop:12,background:'#e50914',color:'#fff',border:'none',borderRadius:4,padding:'0.5rem 1.5rem',fontWeight:700,cursor:'pointer', zIndex: 2}}
                        >Add to Cart</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Events;