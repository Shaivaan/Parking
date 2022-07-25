import { Box } from '@mui/system'
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Slot from '../Card/Slot';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllocatePopOver from '../PopOver/AllocatePopover';

type SlotType = {
  slotCode:string
  isBooked:boolean
  bookedTiming:string
  carCode:string
}

type StoreType = {
  total: number;
  occupied: number;
  data: {}[];
  toast: string;
};


function Parking() {
  
  const [slotWillOpen,setSlotWillOpen] = useState(0);
  const {total,occupied,data} = useSelector((store:StoreType)=>{return store});
  const navigate = useNavigate();
  const [isAllocateVisible,setisAllocateVisible] = useState(false);
  useEffect(()=>{
    if(total == 0 ){
      navigate("/");
    }
  },[])

  const bookRandomSlot= ()=>{
    let arr:any[] = [];
    data.forEach((el:any,i)=>{
     if(el.isBooked == false){
      arr.push(i);
     }
    })
    setSlotWillOpen(arr[0]);
    setisAllocateVisible(true);
  }

  return (
    
    
    <Box>
      {isAllocateVisible && <AllocatePopOver setisAllocateVisible={setisAllocateVisible} slotIndex = {slotWillOpen}/>}
         <Typography align='center'  variant="h4" gutterBottom component="div">
       Here's Your Space
      </Typography>
        <Box className = "states">
        <Button variant="contained">Total Slots : {total}</Button>
        <Button variant="contained">Slots Allocated : {occupied}</Button>
        <Button variant="contained">Slots Available : {total-occupied}</Button>
        <Button variant="contained" disabled={(+total) == (+occupied)} color="success" onClick={()=>{bookRandomSlot()}}>{(+total) != (+occupied) ? "Book Slot" : "All Slots Booked"}</Button>
        </Box>
        <Box className = "data">
          {data.map((el,i:number)=>{
            return (
            <Box key= {i}>
            <Slot slotData={el} slotIndex = {i}/>
            </Box>
            )
          })}
        </Box>
    </Box>
    
  )
}
export default Parking;