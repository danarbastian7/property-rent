import { createSlice } from "@reduxjs/toolkit"
// const storedPropertyItemId = localStorage.getItem("PropertyItemId")
// const price = localStorage.getItem("price")

const initialState = {
  id: 0,
  item_name: "",
  description: "",
  capacity: "",
  price: "",
  total_price: "",
  PropertyId: "",
  PropertyItemId: "",
  start_date: "",
  end_date: "",
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roommate: (state, action) => {
      state.id = action.payload.id
      state.item_name = action.payload.item_name
      state.description = action.payload.description
      state.capacity = action.payload.capacity
      state.price = action.payload.price
      state.total_price = action.payload.total_price
      state.PropertyId = action.payload.PropertyId
      // localStorage.setItem("price", action.payload.price)
      state.PropertyItemId = action.payload.PropertyItemId
      state.start_date = action.payload.start_date
      state.end_date = action.payload.end_date

      // state.first_name = action.payload.first_name
      // state.last_name = action.payload.last_name
      console.log(action.payload)
    },
  },
})

export const { roommate } = roomSlice.actions

export default roomSlice.reducer
