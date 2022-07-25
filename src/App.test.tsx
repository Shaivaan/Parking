import { render, screen } from '@testing-library/react';
import { Home } from './components/Home/Home';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import App from './App';

test('should render App', () => {
  render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
});

