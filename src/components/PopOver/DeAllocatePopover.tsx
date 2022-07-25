import React, { useEffect } from 'react'
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateData,updateOccupied } from '../../Redux/Action';



function DeAllocatePopOver({setisDeAllocateVisible, slotIndex}:{setisDeAllocateVisible:any,slotIndex:number}){
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const {data} = useSelector((store:any)=>store);
    const dispatch = useDispatch();
    const parkedHours = (new Date).getHours()- (+data[slotIndex].bookedTiming.split(":")[0]);
    const parkedMinutes = (new Date).getMinutes()- (+data[slotIndex].bookedTiming.split(":")[1]);


  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    setisDeAllocateVisible(false);
  };

  const handlePay = () => {
    data[slotIndex].carCode = "";
    data[slotIndex].isBooked = false;
    data[slotIndex].timing = "";
    dispatch(updateData(data)); 
    dispatch(updateOccupied(-1));
    setOpen(false);
    setisDeAllocateVisible(false);
  }


  const handleCancel = () => {
    setOpen(false);
    setisDeAllocateVisible(false);
  };

  useEffect(()=>{
    setOpen(true);
  },[])

  return (
    <div style={{padding:"15px"}}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Bill! Thank You for Coming"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
           <Button variant='outlined'>Time : {parkedHours}hrs:{parkedMinutes}min</Button>
          <Typography  variant="h5" component="div">
      Charge : ${(parkedHours+1)*10}
    </Typography>
    <Typography  variant="h5" component="div">
      Your Vehicle Number : {data[slotIndex].carCode}
    </Typography>
      

            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handlePay} autoFocus>
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeAllocatePopOver
