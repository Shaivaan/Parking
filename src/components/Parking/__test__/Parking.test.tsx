import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Parking from '../Parking';
import { store } from '../../../Redux/Store';
jest.setTimeout(10000)

const MockParking = ()=>{
    return (
        <Provider store={store}><BrowserRouter><Parking/></BrowserRouter></Provider>
    )   
}


test('random button should be enable when some data exist in redux', async() => {
  render(<MockParking/>);
  store.dispatch({type:"UPDATE_TOTAL",payload:1});
  store.dispatch({type:"UPDATE_DATA",payload:[{slotCode:1,
    isBooked:false,
    bookedTiming:"",
    carCode:""}]});
  console.log(store.getState());
  store.dispatch({type:"UPDATE_TOASTTYPE",payload:"error"});

  await waitFor(() => {
    const bookButton = screen.getByRole("button",{name:"Book Slot"});
    fireEvent.click(bookButton);
  }, { timeout: 4000 });

});
