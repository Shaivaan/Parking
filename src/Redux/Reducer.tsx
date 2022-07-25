import {
  UPDATE_DATA,
  UPDATE_OCCUPIED,
  UPDATE_TOTAL,
  UPDATE_TOASTTYPE,
} from "./Action";


type InitData = {
  total: number;
  occupied: number;
  data: {}[];
  toast: string;
};

const init_Data = {
  total: 0,
  occupied: 0,
  data: [],
  toast: "error",
};


export const reducer = (
  store = init_Data,
  { type, payload }: { type: string; payload: any }
) => {
  if (type == UPDATE_TOTAL) {
    return { ...store, total: store.total + payload };
  } else if (type == UPDATE_OCCUPIED) {
    return { ...store, occupied: store.occupied + payload };
  } else if (type == UPDATE_DATA) {
    return { ...store, data: payload };
  } else if (type == UPDATE_TOASTTYPE) {
    return { ...store, toast: payload };
  } else {
    return store;
  }
};
