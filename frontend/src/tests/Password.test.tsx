import '@testing-library/jest-dom/jest-globals';

import { expect, describe, it } from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react';

import store from '../slices/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Password from '../views/Password';

describe('Login view', () => {
    
  it('renders password form fields and handles input changes', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Password />
          </MemoryRouter>
        </Provider>
      );

    const PasswordElement = screen.getAllByText('Update password');
    const emailFieldInput = screen.getByRole('textbox', { name: 'Email' });
    const cellphoneFieldInput = screen.getByRole('textbox', { name: 'Cellphone' });
    const passwordFieldInput = document.querySelector<HTMLInputElement>('#password');
    const newPasswordFieldInput = document.querySelector<HTMLInputElement>('#new-password');
    
    expect(PasswordElement.length).toBe(1);
    expect(emailFieldInput).toBeInTheDocument();
    expect(cellphoneFieldInput).toBeInTheDocument();
    expect(passwordFieldInput).not.toBeNull();
    expect(newPasswordFieldInput).not.toBeNull();
    
    fireEvent.change(emailFieldInput, { target: { value: 'john@example.com' } });
    fireEvent.change(cellphoneFieldInput, { target: { value: '1234567890' } });

    expect(emailFieldInput).toHaveValue('john@example.com');
    expect(cellphoneFieldInput).toHaveValue('1234567890');

    if (passwordFieldInput && newPasswordFieldInput) {
        passwordFieldInput.value = 'mySecretPassword';
        newPasswordFieldInput.value = 'myNewPassword';

        expect(passwordFieldInput.value).toBe('mySecretPassword');
        expect(newPasswordFieldInput.value).toBe('myNewPassword');
    }
  });
  
});
