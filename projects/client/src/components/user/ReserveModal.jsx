import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react"
import { GrFormNext } from "react-icons/gr"
import { DetailPropertyFunc } from "../../lib/detailProperty/detailProperty"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"

const ReserveModal = () => {
  const { openModal, isModalOpen, closeModal } = DetailPropertyFunc()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const datePickerStyles = {
    // Example inline styles for the DatePicker container
    fontFamily: "Arial, sans-serif",
    border: "2px solid #ccc",
  }

  const inputStyles = {
    // Example inline styles for the input field
    width: "65%",
    padding: "10px",
    borderRadius: "5px",
    border: "2px solid grey",
    color: "black",
  }
  return (
    <>
      <Button
        colorScheme={"orange"}
        ml="0"
        width={"100%"}
        color="white"
        onClick={openModal}
        cursor="pointer"
      >
        Reserve
        <GrFormNext size={"25px"} />
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make your reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type={"text"} pattern="[A-Za-z]+" />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type={"text"} pattern="[A-Za-z]+" />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Select>
                <option>Hotel a</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Select>
                <option>Hotel a</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Price /night</FormLabel>
              <Input isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setStartDate(update[0])
                  setEndDate(update[1])
                }}
                withPortal
                style={datePickerStyles} // Apply styles to the DatePicker container
                calendarClassName="custom-calendar" // You can apply classes to the calendar container for more styling
                customInput={<input style={inputStyles} />} // Apply styles to the input field
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total Price</FormLabel>
              <Input isReadOnly />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={"3"} pb="10">
            <Button colorScheme={"orange"}>Reserve</Button>
            <Button colorScheme={"red"} onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReserveModal
