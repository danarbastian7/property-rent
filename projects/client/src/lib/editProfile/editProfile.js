import { useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../api/index"
import { login } from "../../redux/features/authSlice"
import { Form, Upload, message } from "antd"
import MyProfile from "../../components/my-profile/MyProfile"

export const EditProfile = () => {
  const authSelector = useSelector((state) => state.auth)

  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      birthdate: "",
      profile_picture: null,
      phone_number: "",
    },
    onSubmit: async ({
      username,
      email,
      gender,
      birthdate,
      profile_picture,
      phone_number,
    }) => {
      try {
        const userData = new FormData()

        if (username && username !== authSelector.username) {
          userData.append("username", username)
        }
        if (email && email !== authSelector.email) {
          userData.append("email", email)
        }
        if (gender && gender !== authSelector.gender) {
          userData.append("gender", gender)
        }
        if (birthdate && birthdate !== authSelector.birthdate) {
          userData.append("birthdate", birthdate)
        }
        if (phone_number && phone_number !== authSelector.phone_number) {
          userData.append("phone_number", phone_number)
        }
        if (profile_picture) {
          userData.append("profile_picture", profile_picture)
        }
        const userResponse = await axiosInstance.patch("/auth/me", userData)
        console.log(userResponse, "coba")

        dispatch(login(userResponse.data.data))
        closeModal()

        toast({ title: "Profile edited", status: "success" })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to edit",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
  })
  const beforeUpload = (file, profile_picture) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      (file.type === "image/png") |
        (file.type === "image/jpeg") |
        (file.type === "image/gif")
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
      return profile_picture
    }
    const isLt2M = file.size / 1024 / 1024 < 1
    if (!isLt2M) {
      message.error("Image must smaller than 1MB!")
      return profile_picture
    }
    return isJpgOrPng && isLt2M
  }
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const options = [
    { value: "female", label: "female" },
    { value: "male", label: "male" },
  ]
  const optionSelect = options.map((val) => {
    return { value: val.value, label: val.label }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [selectedImage, setSelectedImage] = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (allowedTypes.includes(file.type)) {
        const imageURL = URL.createObjectURL(file)
        setSelectedImage(imageURL)
        formik.setFieldValue("profile_picture", file)
      } else {
        alert("Please select a valid image file (JPEG, PNG).")
      }
    }
  }
  return {
    formik,
    beforeUpload,
    formChangeHandler,
    optionSelect,
    authSelector,
    openModal,
    closeModal,
    isModalOpen,
    handleImageChange,
    selectedImage,
  }
}
