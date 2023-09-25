import { useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import { ReactCalendar } from "../reactCalendar/reactCalendar"
import { DetailPropertyFunc } from "../detailProperty/detailProperty"
import ReserveModal from "../../components/user/ReserveModal"
import { roommate } from "../../redux/features/roomSlice"
import { useSelector } from "react-redux"

export const TransactionFunc = () => {
  const { id } = useParams()
  const propertyId = id
  const [transactionId, setTransactionId] = useState([])
  const toast = useToast()
  const { priceValue, setSelectedItem } = DetailPropertyFunc()

  const selector = useSelector((state) => state.room)
  const date = selector.start_date
  console.log(date, "try redux save")

  const formik = useFormik({
    initialValues: {
      start_date: "",
      end_date: "",
      first_name: "",
      last_name: "",
      price: "",
      // total_price: "" || priceValue,
      PropertyItemId: "",
      PropertyId: "" || propertyId,
    },
    onSubmit: async ({
      start_date,
      end_date,
      first_name,
      last_name,
      price,
      // total_price,
      PropertyItemId,
      PropertyId,
    }) => {
      try {
        const response = await axiosInstance.post("/transaction/", {
          // start_date: startDate ? startDate.toISOString().split("T")[0] : "",
          // end_date: endDate ? endDate.toISOString().split("T")[0] : "",
          price: selector.price,
          // total_price: "" || priceValue,
          PropertyItemId: selector.PropertyItemId,
          PropertyId: "" || propertyId,
          first_name,
          last_name,
          start_date: "" || selector.start_date,
          end_date: "" || selector.end_date,
        })
        console.log(response, "transac")
        setTransactionId(response)
        toast({
          title: "Your transaction has been made",
          description: response.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Can't make your new transaction",
          description: err.response.message,
          status: "error",
        })
      }
    },
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  // const handleFormSubmit = async () => {
  //   try {
  //     formik.handleSubmit()
  //   } catch (err) {
  //     console.error("Error during form submission:", err)
  //   }
  // }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }
  return {
    formik,
    formChangeHandler,
    // handleFormSubmit,
  }
}
