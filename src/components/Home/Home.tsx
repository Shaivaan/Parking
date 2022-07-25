import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Toast from "../Toast/Toast";
import { useDispatch } from "react-redux";
import { updateData, updateTotal } from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";


export const Home = () => {
    const [inputValue,setInputValue] = useState("");
    const [toastDisplay,setToastDisplay]  = useState<string | boolean>("first");  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
      class UniqueSlot{
      slotCode:string
      isBooked:boolean
      bookedTiming:string
      carCode:string

      constructor(slotCode:string,isBooked:boolean,bookedTiming:string,carCode:string){
        this.slotCode = slotCode
        this.isBooked  = isBooked
        this.bookedTiming = bookedTiming
        this.carCode = carCode
      }

    }
    


    
    const handleSubmit = ()=>{
       if(+(inputValue) <= 0 || Math.floor(+(inputValue)) - Math.ceil(+(inputValue)) !== 0 ) {
        setToastDisplay(!toastDisplay);
       }else{ 
         let arr = [];
        for(var i = 0;i < +(inputValue);i++){
          arr.push(new UniqueSlot(`Slot ${i+1}`,false,"",""))
        }
        dispatch(updateData(arr));
        dispatch(updateTotal(+inputValue));
        navigate("/parking");
       }
    }

    
  return (
    <Box>
      <Box
        sx={{
          width: 400,
          height: 200,
          
          borderRadius: "10px",
        }}
        className="center"
      >
        <Typography variant="h4" align= "center">The Jurassic Parking</Typography>
        <Box className="centu" marginTop={"6vh"} component="form" >
            
          <TextField
          type= "number"
            id="outlined-basic"
            label="Enter Slots"
            variant="outlined"
            className="centu"
          autoComplete="off"
            onChange={(e)=>{setInputValue(e.target.value)}}
          />
          <Button onClick={handleSubmit} disabled= {inputValue.trim().length === 0} variant="outlined">Get</Button>
            
        </Box>
      </Box>
     <Toast run={toastDisplay} msg = {"Enter valid number of slots"} />
    </Box>
  );
};
