import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import { roommate } from "../../redux/features/roomSlice"
import { ReactCalendar } from "../reactCalendar/reactCalendar"

export const DetailPropertyFunc = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.room)

  // React Calendar
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  console.log(startDate, "coba")
  console.log(endDate, "coba2")

  const calculateDateDiff = () => {
    if (startDate && endDate) {
      const startMoment = moment(startDate)
      const endMoment = moment(endDate)
      const diff = endMoment.diff(startMoment, "days")

      return diff
    }
    return 0
  }

  // =============== Modal Area
  const [isModalOpen, setIsModalOpen] = useState(false)
  const params = useParams()
  const [roomCard, setRoomCard] = useState([])
  const [images, setImages] = useState([])
  const [propertyItem, setPropertyItem] = useState([])
  const [room, setRoom] = useState([])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // ===============================

  const fetchRoomById = async () => {
    try {
      const response = await axiosInstance.get(`/property/${params.id}`)
      setRoomCard(response.data.data)
      setPropertyItem(response.data.data.PropertyItems)
      setImages(response.data.data.PropertyImages)
    } catch (err) {
      console.log(err)
    }
  }

  // ===============================

  const [selectedItem, setSelectedItem] = useState("None")
  const [priceValue, setPriceValue] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [propertyItemId, setPropertyItemId] = useState("")

  const getPriceFromSelectedItem = () => {
    const selectedPropertyItem = propertyItem.find(
      (item) => item.item_name === selectedItem
    )
    return selectedPropertyItem ? selectedPropertyItem.price : 0
  }

  const getIdFromSelectedItem = () => {
    const selectedPropertyItem = propertyItem.find(
      (item) => item.item_name === selectedItem
    )
    return selectedPropertyItem ? selectedPropertyItem.id : 0
  }

  const totalDays = calculateDateDiff()
  const updateTotalPrice = () => {
    return priceValue * totalDays
  }

  useEffect(() => {
    fetchRoomById()

    setPriceValue(getPriceFromSelectedItem())
    setPropertyItemId(getIdFromSelectedItem())
    setTotalPrice(updateTotalPrice())
  }, [selectedItem, totalDays, priceValue, totalPrice])

  useEffect(() => {
    const updatedStartDate = moment(startDate).add(1, "days").toDate()
    const updatedEndDate = moment(endDate).add(1, "days").toDate()

    dispatch(
      roommate({
        PropertyItemId: propertyItemId,
        price: priceValue,
        start_date: updatedStartDate,
        end_date: updatedEndDate,
        total_price: updateTotalPrice(),
      })
    )
  }, [propertyItemId, startDate, endDate])

  return {
    openModal,
    closeModal,
    isModalOpen,
    roomCard,
    propertyItem,
    selectedItem,
    setSelectedItem,
    priceValue,
    setPropertyItemId,
    propertyItemId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    images,
  }
}
