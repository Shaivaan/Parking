import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Parking from '../Parking';
import { store } from '../../../Redux/Store';

const MockParking = ()=>{
    return (
        <Provider store={store}><BrowserRouter><Parking/></BrowserRouter></Provider>
    )   
}


test('should render Parking', () => {
  render(<MockParking/>);

});
