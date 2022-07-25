import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Home } from '../Home';
import { store } from '../../../Redux/Store';

const MockHome = ()=>{
    return (
        <Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>
    )   
}

test('button should enable on input', async() => {
    render(<MockHome/>);
    let slotInput = screen.getByLabelText("Enter Slots");
    fireEvent.change(slotInput,{target:{value:"154"}});
    expect( screen.getByRole("button")).toBeEnabled();
  });



  test('button should not enable on input', async() => {
    render(<MockHome/>);
    let slotInput = screen.getByLabelText("Enter Slots");
    fireEvent.change(slotInput,{target:{value:""}});
    expect(await screen.findByRole("button")).not.toBeEnabled();
  });

  test('button can be clicked after having some value', async() => {
    render(<MockHome/>);
    let slotInput = screen.getByLabelText("Enter Slots");
    fireEvent.change(slotInput,{target:{value:"12"}});
    fireEvent.click(screen.getByRole("button"));
  });

