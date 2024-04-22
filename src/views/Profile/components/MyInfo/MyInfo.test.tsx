import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyInfo from './index.tsx';

test('renders MyInfo form and displays validation errors', async () => {
    render(<MyInfo />);
    let user = userEvent.setup();

    const nombreInput = screen.getByLabelText(/Nombre/i) as HTMLInputElement;
    const edadInput = screen.getByLabelText(/Edad/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
 
    let $button = await screen.findByRole<HTMLInputElement>('button', {
        name: 'Guardar datos',
    });

    await user.click($button);
    await screen.findAllByText<HTMLParagraphElement>("Este campo es obligatorio")
    
    await user.type(nombreInput, 'i')
    await user.type(edadInput, '-10')
    await user.type(emailInput, 'invalidEmail')
    
    expect(nombreInput.value).toBe('i')
    expect(edadInput.value).toBe('-10')
    expect(emailInput.value).toBe('invalidEmail')
    
    await user.click($button);
    await screen.findByText<HTMLParagraphElement>("El nombre debe tener al menos dos caracteres")
    await screen.findByText<HTMLParagraphElement>("Debe ingresar un email válido")
    await screen.findByText<HTMLParagraphElement>("La edad debe ser mayor o igual a 0")

});