import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders restricted access login form by default', () => {
  render(<App />);
  const loginHeader = screen.getByText(/Restricted Access/i);
  expect(loginHeader).toBeInTheDocument();
  
  const passwordInput = screen.getByPlaceholderText(/Enter password.../i);
  expect(passwordInput).toBeInTheDocument();
});

test('allows submission and redirects upon entering a password', () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText(/Enter password.../i);
  const unlockButton = screen.getByText(/Unlock Application/i);

  fireEvent.change(passwordInput, { target: { value: 'somepassword' } });
  fireEvent.click(unlockButton);

  // Once authenticated, the restricted access screen should disappear
  const loginHeader = screen.queryByText(/Restricted Access/i);
  expect(loginHeader).not.toBeInTheDocument();

  // Search portal header/logo should be present
  const searchInput = screen.getByPlaceholderText(/Search/i);
  expect(searchInput).toBeInTheDocument();
});
