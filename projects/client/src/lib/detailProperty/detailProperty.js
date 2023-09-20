import { useState } from "react"

export const DetailPropertyFunc = () => {
  // Modal Area
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return { openModal, closeModal, isModalOpen }
}
