import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieItem from './index.tsx';

const onMovieClick = vi.fn();

test('renders movie item with correct data', () => {
	const id = 1;
	const title = 'Test Movie';
	const poster_path = 'poster.jpg';
  
	render(<MovieItem id={id} title={title} poster_path={poster_path} onMovieClick={onMovieClick} />);
  
	expect(screen.getByText(title));
	expect(screen.getByRole('img', { name: 'hearth-filled' }));

	screen.debug()

});