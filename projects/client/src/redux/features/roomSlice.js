import { createSlice } from "@reduxjs/toolkit"
// const storedPropertyItemId = localStorage.getItem("PropertyItemId")
// const price = localStorage.getItem("price")

const totalPrice = localStorage.getItem("total_price") || "" // Default to an empty string if not found in localStorage
const startDate = localStorage.getItem("start_date") || ""
const endDate = localStorage.getItem("end_date") || ""

const initialState = {
  id: 0,
  item_name: "",
  description: "",
  capacity: "",
  price: "",
  total_price: "" || totalPrice,
  PropertyId: "",
  PropertyItemId: "",
  start_date: "" || startDate,
  end_date: "" || endDate,
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roommate: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        item_name: action.payload.item_name,
        description: action.payload.description,
        capacity: action.payload.capacity,
        price: action.payload.price,
        total_price: action.payload.total_price,
        PropertyId: action.payload.PropertyId,
        PropertyItemId: action.payload.PropertyItemId,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date,
      }
    },
  },
})

export const { roommate } = roomSlice.actions

export default roomSlice.reducer
