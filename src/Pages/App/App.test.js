import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'
import App from './App';

test('renders learn react link', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
  const linkElement = screen.getByText("Bookmarked");
  expect(linkElement).toBeInTheDocument();
});
