import React, { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateData,updateOccupied } from '../../Redux/Action';


function DeAllocatePopOver({setisDeAllocateVisible, slotIndex}:{setisDeAllocateVisible:any,slotIndex:number}){
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const {data} = useSelector((store:any)=>store);
    const dispatch = useDispatch();
    const parkedHours = (new Date).getHours()- (+data[slotIndex].bookedTiming.split(":")[0]);
    const parkedMinutes = (new Date).getMinutes()- (+data[slotIndex].bookedTiming.split(":")[1]);
    const [isLoading,setIsLoading] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
      setOpen(false);
    setisDeAllocateVisible(false);
    },1000)
    // setOpen(false);
    // setisDeAllocateVisible(false);
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
      { isLoading &&  <Box component={"div"} style= {{display:"flex",justifyContent:"center"}}>
        <CircularProgress color="secondary" />
        </Box>}
        <DialogTitle id="responsive-dialog-title">
          {"Bill! Thank You for Coming"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
           <Box>Time : {parkedHours}hrs,{parkedMinutes}min</Box>
          <Typography  variant="h5" component="div">
      Charge : ${(parkedHours+1)*10}
    </Typography>
    <Typography  variant="h5" component="div">
      Your Vehicle Number : {data[slotIndex].carCode}
    </Typography>
      

            
          </DialogContentText>
        </DialogContent>
       {!isLoading && <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handlePay} autoFocus>
            Pay
          </Button>
        </DialogActions>}
      </Dialog>
    </div>
  )
  
}

export default DeAllocatePopOver
