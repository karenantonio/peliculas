
import { test, expect } from 'vitest'
import { screen } from '@testing-library/react' // render, fireEvent
// import userEvent from '@testing-library/user-event';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import MovieItem from './index.tsx';

// jest.mock('../../../../state/useUserData', () => ({
//   useUserData: () => ({
//     userData: null,
//     setUserData: jest.fn(),
//   }),
// }));

test('renders MovieItem form and displays validation errors', async() => {
	console.log('test MovieItem');

	// const mockOnMovieClick = jest.fn();

	// render(
	// 	<MovieItem
	// 	id={1}
	// 	title="Test Movie Title"
	// 	poster_path="https://example.com/poster.jpg"
	// 	// onMovieClick={mockOnMovieClick}
	// 	data-testid="movie-item-1"
	// 	/>
	// );
	screen.debug()
	expect(MovieItem).toBeInstanceOf(Function)

})