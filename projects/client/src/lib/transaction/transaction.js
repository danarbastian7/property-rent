import { useFormik } from "formik"
import { useParams } from "react-router-dom"

export const Transaction = () => {
  const { id } = useParams()
  const propertyId = id

  const formik = useFormik({
    initialValues: {
      start_date: "",
      end_date: "",
      price: "",
      total_price: "",
      PropertyItemId: "",
      PropertyId: id,
    },
    onSubmit: async (values) => {
      try {
        let newTransaction = new FormData()
        newTransaction.append("start_date", values.start_date)
        newTransaction.append("end_date", values.end_date)
      } catch (err) {
        console.log(err)
      }
    },
  })
}
