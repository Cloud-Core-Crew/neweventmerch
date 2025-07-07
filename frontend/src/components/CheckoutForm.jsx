import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
`;

const Spinner = styled.div`
  border: 2px solid #2196f3;
  border-radius: 50%;
  border-top: 2px solid transparent;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: #ff0000;
  padding: 2rem;
`;

const ErrorTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TryAgainButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #1976d2;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div``;

const Label = styled.label`
  display: block;
  color: #667583;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #1a252f;
  border: 1px solid #2b3840;
  color: white;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const CheckoutForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card'
  });

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner>
        <Spinner />
      </LoadingSpinner>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorTitle>Error</ErrorTitle>
        <p>{error}</p>
        <TryAgainButton onClick={() => window.location.reload()}>Try Again</TryAgainButton>
      </ErrorContainer>
    );
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          {errors.address && <ErrorText>{errors.address}</ErrorText>}
        </FormField>

        <FormField>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </FormField>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2196f3'}
        >
          Complete Purchase
        </button>
      </Form>
    </FormContainer>
  );
};

export default CheckoutForm;
