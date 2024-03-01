import '@testing-library/jest-dom/jest-globals';

import { expect, describe, it } from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react';

import store from '../slices/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Login from '../views/Login';

describe('Login view', () => {
    
  it('renders login form fields and handles input changes', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Login />
          </MemoryRouter>
        </Provider>
      );

    const LoginElements = screen.getAllByText('Login');
    const emailFieldInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordFieldInput = document.querySelector<HTMLInputElement>('#password');
    
    expect(LoginElements.length).toBe(2);
    expect(emailFieldInput).toBeInTheDocument();
    expect(passwordFieldInput).not.toBeNull();
    
    fireEvent.change(emailFieldInput, { target: { value: 'john@example.com' } });
    
    expect(emailFieldInput).toHaveValue('john@example.com');

    if (passwordFieldInput) {
        passwordFieldInput.value = 'mySecretPassword';

        expect(passwordFieldInput.value).toBe('mySecretPassword');
    }
  });
  
});
