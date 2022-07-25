import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Toast from '../Toast';
import { store } from '../../../Redux/Store';

const MockToast = ()=>{
    return (
        <Provider store={store}><BrowserRouter><Toast run = {true} msg={"Hello"}/></BrowserRouter></Provider>
    )   
}


test('should render Toast', () => {
  render(<MockToast/>);

});


