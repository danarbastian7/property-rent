import { useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

export const RoomFunc = () => {
  const toast = useToast()
  const params = useParams()
  // Fetch Room
  const [roomById, setRoomById] = useState(null)

  // Update Room Info
  const formik = useFormik({
    initialValues: {
      item_name: "",
      description: "",
      capacity: "",
      price: "",
    },
    onSubmit: async ({ item_name, description, capacity, price }) => {
      try {
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to edit room info",
          status: "error",
        })
      }
    },
  })

  // Delete Room
  const deleteRoom = async (id) => {
    try {
      await axiosInstance.delete(`/room/delete/${id}`)

      window.location.reload(false)
      toast({ title: "Post deleted", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }
  return {
    deleteRoom,
  }
}
