import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Slot from '../Slot';
import { store } from '../../../Redux/Store';


const slotData = {
        slotCode:"",
        isBooked:false,
        bookedTiming:"dsa",
        carCode:"123"
}

test('renders learn react link', () => {
  render(<Provider store={store}><BrowserRouter><Slot slotData= {slotData}  slotIndex={0}/></BrowserRouter></Provider>);
});
