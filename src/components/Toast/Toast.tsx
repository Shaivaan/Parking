import React, { useEffect } from 'react'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';



export interface State extends SnackbarOrigin {
    open: boolean;
  }


function Toast({run,msg}:{run : boolean | string,msg:string}) {
    const {toast} = useSelector((store:any)=>store)
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      
      const { vertical, horizontal, open } = state;

      const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ open: true, ...newState });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

      
   
      useEffect(()=>{
        if(run !== "first"){
            setState({ open: true, ...{
              vertical: 'top',
              horizontal: 'right',
            } });
        }
      },[run]);


    
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={800}
        key={vertical + horizontal}
      >
        <Alert severity={toast} sx={{ width: '100%' }}>
          {msg}
        </Alert>
        
      </Snackbar>
      </>
  )
}

export default Toast
