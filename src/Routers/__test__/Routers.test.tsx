import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Routers } from '../Routers';
import { store } from '../../Redux/Store';


test('should render Routers', () => {
  render(<Provider store={store}><BrowserRouter><Routers></Routers></BrowserRouter></Provider>);
});