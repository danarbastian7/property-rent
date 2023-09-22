import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react"
import { GrFormNext } from "react-icons/gr"
import { useState } from "react"
import { DetailPropertyFunc } from "../../lib/detailProperty/detailProperty"
import { ReactCalendar } from "../../lib/reactCalendar/reactCalendar"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

const ReserveModal = () => {
  const {
    openModal,
    isModalOpen,
    closeModal,
    propertyItem,
    selectedItem,
    setSelectedItem,
    priceValue,
  } = DetailPropertyFunc()
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    datePickerStyles,
    inputStyles,
    totalDays,
  } = ReactCalendar()
  const calculateTotalPrice = () => {
    return totalDays * priceValue
  }
  const totalPrice = calculateTotalPrice()
  // ===========================

  console.log(totalPrice)

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
              <>
                <FormLabel>Room Type</FormLabel>
                <Select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  <option
                    value="None"
                    style={{
                      fontStyle: "italic",
                    }}
                  >
                    None
                  </option>
                  {propertyItem.map((val) => (
                    <option key={val.item_name} value={val.item_name}>
                      {val.item_name}
                    </option>
                  ))}
                </Select>

                <FormLabel>Price /night</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="¥" />
                  <Input value={priceValue} isReadOnly />
                </InputGroup>
              </>
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
                dateFormat="dd/MM/yyyy"
                withPortal
                style={datePickerStyles} // Apply styles to the DatePicker container
                calendarClassName="custom-calendar" // You can apply classes to the calendar container for more styling
                customInput={<input style={inputStyles} />} // Apply styles to the input field
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children="¥" />
                <Input isReadOnly value={totalPrice} />
              </InputGroup>
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
