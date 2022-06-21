import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Combobox from './Combobox';

describe('<Combobox />', () => {
  test('it should mount', () => {
    render(<Combobox />);
    
    const combobox = screen.getByTestId('Combobox');

    expect(combobox).toBeInTheDocument();
  });
});