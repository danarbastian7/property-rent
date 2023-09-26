import { useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import { DetailPropertyFunc } from "../detailProperty/detailProperty"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { configureStore } from "@reduxjs/toolkit"
import moment from "moment"

export const TransactionFunc = () => {
  const { id } = useParams()
  const propertyId = id
  const [transactionId, setTransactionId] = useState([])
  const toast = useToast()
  const { priceValue, selectedItem } = DetailPropertyFunc()
  const selector = useSelector((state) => state.room)
  console.log(selector.start_date, "id")
  console.log(selector.end_date, "id2")

  const formik = useFormik({
    initialValues: {
      start_date: "",
      end_date: "",
      first_name: "",
      last_name: "",
      price: "",
      total_price: "",
      PropertyItemId: "",
      PropertyId: "" || propertyId,
    },
    onSubmit: async ({ first_name, last_name }) => {
      try {
        const response = await axiosInstance.post("/transaction/", {
          price: selector.price,
          total_price: selector.total_price,
          PropertyItemId: selector.PropertyItemId,
          PropertyId: "" || propertyId,
          first_name,
          last_name,
          start_date: "" || selector.start_date,
          end_date: "" || selector.end_date,
        })
        if (selector.PropertyItemId === 0) {
          throw new Error("Please choose the Room Type")
        }
        if (selector.start_date === null || selector.end_date === null) {
          throw new Error("Please choose your desire date to stay")
        }
        if (moment(selector.start_date).isSame(selector.end_date)) {
          throw new Error("Start date and end date cannot be the same")
        }
        console.log(response, "transac")
        setTransactionId(response)
        toast({
          title: "Your transaction has been made",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Can't make your new transaction",
          description: err.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(
          /^[A-Za-z\s]+$/,
          "Invalid format. Only letters and spaces are allowed"
        )
        .required("First name is required"),
      last_name: Yup.string()
        .matches(
          /^[A-Za-z\s]+$/,
          "Invalid format. Only letters and spaces are allowed"
        )
        .required("Last name is required"),
    }),
    validateOnChange: false,
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }
  return {
    formik,
    formChangeHandler,
  }
}
