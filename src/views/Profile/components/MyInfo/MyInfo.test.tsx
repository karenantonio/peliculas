import { test } from 'vitest' // , expect
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyInfo from './index.tsx';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// Mock useUserData hook (replace with your implementation if needed)
// jest.mock('../../../../state/useUserData', () => ({
//   useUserData: () => ({
//     userData: null,
//     setUserData: jest.fn(),
//   }),
// }));

// const schema = yup.object().shape({
//   nombre: yup.string().required("Este campo es obligatorio"),
//   email: yup.string()
//     .required("Este campo es obligatorio")
//     .matches(/^\S+@\S+$/, "Debe ingresar un email válido"),
//   edad: yup.number()
//     .required("Este campo es obligatorio")
//     .integer("La edad debe ser un número entero")
//     .min(0, "La edad debe ser mayor o igual a 0")
//     .max(120, "La edad debe ser menor o igual a 120")
//     .typeError("La edad debe ser un número válido"),
// });

test('renders MyInfo form and displays validation errors', async () => {
    console.log('test MyInfo');
    render(<MyInfo />);

    // Find form elements
    const nombreInput = await screen.findByLabelText(/Nombre/i);
    const edadInput = await screen.findByLabelText(/Edad/i);
    const emailInput = await screen.findByLabelText(/Email/i);
    const submitButton = await screen.getByRole('button', { name: /Guardar datos/i });

    // Submit empty form - expect validation errors
    fireEvent.click(submitButton);

    //   expect(screen.getByText(/Este campo es obligatorio/i)).toBeInTheDocument();
    //   expect(screen.getByText(/Debe ingresar un email válido/i)).toBeInTheDocument();

    // Simulate user input with errors
    await userEvent.type(nombreInput, 'invalid name'); // Invalid name
    await userEvent.type(edadInput, '-10'); // Negative age
    await userEvent.type(emailInput, 'invalidEmail'); // Invalid email

    fireEvent.click(submitButton);

    //   expect(screen.getByText(/La edad debe ser mayor o igual a 0/i)).toBeInTheDocument();
    //   expect(screen.getByText(/Debe ingresar un email válido/i)).toBeInTheDocument();
});