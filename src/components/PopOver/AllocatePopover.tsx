import React, { SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { updateData, updateOccupied, updateToast } from "../../Redux/Action";
import Toast from "../Toast/Toast";
import { Typography } from "@mui/material";


type StoreType = {
  total: number;
  occupied: number;
  data: {}[];
  toast: string;
};

type SlotType = {
  slotCode:string
  isBooked:boolean
  bookedTiming:string
  carCode:string
}



function AllocatePopOver({
  setisAllocateVisible,
  slotIndex,
}: {
  setisAllocateVisible: any;
  slotIndex: number;
}) {

  const minuteHandler = ()=>{
    let minutes:any = (new Date).getMinutes();
    if(minutes < 10){
      minutes = `0${minutes}`
    }
    return minutes;
  }

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  // const [parkTime, setParkTime] = useState(`${(new Date).getHours()}:${(new Date).getMinutes()}`);
  const [parkTime, setParkTime] = useState(`${(new Date).getHours()}:${minuteHandler()}`);
  const [carCode, setCarCode] = useState("");
  const [toastMsg,setToastMsg] = useState("");
  const [toastDisplay,setToastDisplay]  = useState<string | boolean>("first");


  const { data,toast } = useSelector((store: any) => {
    return store;
  });


  const dispatch = useDispatch();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

 
  const handleBook = () => {
    let currentDecimalTime:number = +(`${(new Date).getHours()}.${minuteHandler()}`);
    let parkDecimalTime = +(parkTime.replace(":","."));
    if (parkTime.trim().length == 0 || carCode.trim().length == 0){
      dispatch(updateToast("warning"));
      setToastMsg("Oops!, Fill all Entries");
      setToastDisplay(!toastDisplay);
      return;
    }  

    if (checkBookedSlots() == true){
      dispatch(updateToast("info"));
      setToastMsg("Vehicle Already Parked");
      setToastDisplay(!toastDisplay);
      return;
    } 

    if(currentDecimalTime < parkDecimalTime){
      dispatch(updateToast("error"));
      setToastMsg("Invalid Parking Time");
      setToastDisplay(!toastDisplay);
      setParkTime(`${(new Date).getHours()}:${minuteHandler()}`);
      return;
    }

    updateSlot();
  }    


  const checkBookedSlots=()=>{
    let status = false;
    data.forEach((el:SlotType) => {
      if(el.carCode == carCode){
        status = true;
      }      
    });
    return status;
  }

  const updateSlot = ()=>{

    data[+slotIndex].bookedTiming = parkTime;
    data[+slotIndex].carCode = carCode;
    data[+slotIndex].isBooked = true;
    dispatch(updateData(data));
    dispatch(updateOccupied(1));
    setOpen(false);
    setisAllocateVisible(false);
  }

  const handleCancel = () => {
    setOpen(false);
    setisAllocateVisible(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Enter Vehicle Number Reserve Space"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">Slot Number : {slotIndex+1}</Typography>
          <DialogContentText>
            <TextField
              id="demo-helper-text-misaligned"
              type={"time"}
              value= {parkTime}
              autoComplete="off"
              helperText="Please Enter parking Time"
              size="small"
              onChange={(e) => setParkTime(e.target.value)}
            />

            <Box marginTop={"10px"}>
              <TextField
                id="demo-helper-text-misaligned"
                label="Vehicle Code"
                helperText="Please Enter Vehicle Code"
                size="small"
                autoComplete="off"
                onChange={(e) => setCarCode(e.target.value)}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleBook} autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>
      <Toast run={toastDisplay} msg = {toastMsg} />
    </div>
  );
}

export default AllocatePopOver;
