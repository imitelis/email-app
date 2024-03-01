import '@testing-library/jest-dom/jest-globals';

import { expect, describe, it } from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react';

import store from '../slices/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SignUp from '../views/SignUp';

describe('SignUp view', () => {
    
  it('renders sign up form fields and handles input changes', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SignUp />
          </MemoryRouter>
        </Provider>
      );

    const signUpElements = screen.getAllByText('Sign up');
    const nameFieldInput = screen.getByRole('textbox', { name: 'Name' });
    const emailFieldInput = screen.getByRole('textbox', { name: 'Email' });
    const cellphoneFieldInput = screen.getByRole('textbox', { name: 'Cellphone' });
    const passwordFieldInput = document.querySelector<HTMLInputElement>('#password');
    const repeatPasswordFieldInput = document.querySelector<HTMLInputElement>('#repeat-password');
    
    expect(signUpElements.length).toBe(2);
    expect(nameFieldInput).toBeInTheDocument();
    expect(emailFieldInput).toBeInTheDocument();
    expect(cellphoneFieldInput).toBeInTheDocument();
    expect(passwordFieldInput).not.toBeNull();
    expect(repeatPasswordFieldInput).not.toBeNull();

    fireEvent.change(nameFieldInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailFieldInput, { target: { value: 'john@example.com' } });
    fireEvent.change(cellphoneFieldInput, { target: { value: '1234567890' } });

    expect(nameFieldInput).toHaveValue('John Doe');
    expect(emailFieldInput).toHaveValue('john@example.com');
    expect(cellphoneFieldInput).toHaveValue('1234567890');

    if (passwordFieldInput && repeatPasswordFieldInput) {
      passwordFieldInput.value = 'mySecretPassword';
      repeatPasswordFieldInput.value = 'mySecretPassword';

      expect(passwordFieldInput.value).toBe('mySecretPassword');
      expect(repeatPasswordFieldInput.value).toBe('mySecretPassword');
    }
  });

});
