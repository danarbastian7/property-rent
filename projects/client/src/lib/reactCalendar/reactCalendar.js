import moment from "moment"
import { useEffect, useState } from "react"

export const ReactCalendar = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const calculateDateDiff = () => {
    if (startDate && endDate) {
      const startMoment = moment(startDate)
      const endMoment = moment(endDate)
      const diff = endMoment.diff(startMoment, "days")

      return diff
    }
    return 0
  }
  const totalDays = calculateDateDiff()
  console.log(totalDays)

  // DatePicker Style
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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    datePickerStyles,
    inputStyles,
    totalDays,
  }
}
