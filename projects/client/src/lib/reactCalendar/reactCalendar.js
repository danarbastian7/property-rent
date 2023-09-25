import moment from "moment"
import { useEffect, useState } from "react"

export const ReactCalendar = () => {
  const datePickerStyles = {
    fontFamily: "Arial, sans-serif",
    border: "2px solid #ccc",
  }

  const inputStyles = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "2px solid grey",
    color: "black",
  }

  return {
    datePickerStyles,
    inputStyles,
  }
}
