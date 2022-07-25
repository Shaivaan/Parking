import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AllocatePopOver from '../AllocatePopover';
import { store } from '../../../Redux/Store';
import DeAllocatePopOver from '../DeAllocatePopover';
import {createMemoryHistory} from 'history'


// Allocate

  const MockAllocate = ()=>{
    return (
      <Provider store={store}><BrowserRouter><AllocatePopOver setisAllocateVisible={"asd"} slotIndex = {1}/></BrowserRouter></Provider>
    )
  }



// test('should render allocatePopOver', () => {
//   render(<MockAllocate/>);
//   const cancelButton = screen.getByRole("button",{name:"Cancel"});
//   fireEvent.click(cancelButton);  
// });






// DeaAllocate





test('should render deallocatePopOver', () => {
    render(<Provider store={store}><BrowserRouter><DeAllocatePopOver setisDeAllocateVisible={"asd"} slotIndex = {1}/></BrowserRouter></Provider>);
  });