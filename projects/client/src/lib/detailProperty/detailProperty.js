import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import { ReactCalendar } from "../reactCalendar/reactCalendar"

export const DetailPropertyFunc = () => {
  // Modal Area
  const [isModalOpen, setIsModalOpen] = useState(false)
  const params = useParams()
  const [roomCard, setRoomCard] = useState([])
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
    } catch (err) {
      console.log(err)
    }
  }
  // ===============================
  const [propertyItem, setPropertyItem] = useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [priceValue, setPriceValue] = useState(0)
  const getPriceFromSelectedItem = () => {
    const selectedPropertyItem = propertyItem.find(
      (item) => item.item_name === selectedItem
    )
    return selectedPropertyItem ? selectedPropertyItem.price : 0
  }

  useEffect(() => {
    fetchRoomById()
    setPriceValue(getPriceFromSelectedItem())
  }, [selectedItem])

  return {
    openModal,
    closeModal,
    isModalOpen,
    roomCard,
    propertyItem,
    getPriceFromSelectedItem,
    selectedItem,
    setSelectedItem,
    priceValue,
  }
}
