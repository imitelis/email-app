import '@testing-library/jest-dom/jest-globals';

import { render, fireEvent, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals'

import Login from '../views/Login';

describe('Login component', () => {
  it('renders email and password fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('updates state when input fields change', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  /*
  it('calls handleLogin function when Login button is clicked', () => {
    const handleLoginMock = jest.fn();
    render(<Login handleLogin={handleLoginMock} />); // Pass a mock function as a prop

    fireEvent.click(screen.getByText('Login'));
    expect(handleLoginMock).toHaveBeenCalledTimes(1);
  });
  */
});
