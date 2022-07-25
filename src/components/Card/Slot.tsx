import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AllocatePopOver from "../PopOver/AllocatePopover";
import { useState } from "react";
import DeAllocatePopOver from "../PopOver/DeAllocatePopover";


type PropType = {
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


function Slot({slotData,slotIndex}:{slotData:any,slotIndex:number}) {
  const [isAllocateVisible,setisAllocateVisible] = useState(false);
  const [isDeAllocateVisible,setisDeAllocateVisible] = useState(false);

  
  return (
    <Box>
      {isAllocateVisible && <AllocatePopOver setisAllocateVisible={setisAllocateVisible} slotIndex = {slotIndex}/>}
      {isDeAllocateVisible && <DeAllocatePopOver setisDeAllocateVisible={setisDeAllocateVisible} slotIndex = {slotIndex}/>}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {slotData.isBooked ? `Vehicle Parked : ${slotData.carCode}` : "Park Your Vehicle Here"}
            
          </Typography>
          <Typography variant="h5" component="div">
            Slot : {slotIndex+1}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={ slotData.isBooked ? "red":"green" }>
            {slotData.isBooked ? "Booked" : "Available" }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{slotData.isBooked ? setisDeAllocateVisible(true): setisAllocateVisible(true)}} variant="outlined" >
          {slotData.isBooked ? "Deallocate" : "Allocate"} 
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
export default Slot;
