import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await registerUser({ username: form.name, email: form.email, password: form.password });
      setMessage('Registration successful!');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center' }}>
      <h1 style={{ color: '#e50914', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: '0.7rem', background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 700 }}>
          Register
        </button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default Register;
