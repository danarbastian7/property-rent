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
import { DetailPropertyFunc } from "../../lib/detailProperty/detailProperty"
import { ReactCalendar } from "../../lib/reactCalendar/reactCalendar"
import { TransactionFunc } from "../../lib/transaction/transaction"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const ReserveModal = () => {
  const {
    openModal,
    isModalOpen,
    closeModal,
    propertyItem,
    selectedItem,
    setSelectedItem,
    priceValue,
    propertyItemId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    totalDays,
  } = DetailPropertyFunc()
  const { datePickerStyles, inputStyles } = ReactCalendar()
  const selectedStartDate = startDate

  const { formChangeHandler, formik } = TransactionFunc(selectedStartDate)

  const calculateTotalPrice = () => {
    return totalDays * priceValue
  }
  const totalPrice = calculateTotalPrice()
  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }
  const handleDateChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  console.log(totalPrice, "prop it id")

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
        <form onSubmit={handleFormSubmit}>
          <ModalContent>
            <ModalHeader>Make your reservation</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type={"text"}
                  pattern="[A-Za-z]+"
                  name="first_name"
                  onChange={formChangeHandler}
                  value={formik.values.first_name}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type={"text"}
                  pattern="[A-Za-z]+"
                  name="last_name"
                  onChange={formChangeHandler}
                  value={formik.values.last_name}
                />
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
                    <Input
                      value={priceValue}
                      isReadOnly
                      name="price"
                      onChange={formChangeHandler}
                    />
                  </InputGroup>
                </>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
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
                  <Input
                    isReadOnly
                    value={totalPrice}
                    onChange={formChangeHandler}
                    name="total_price"
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter gap={"3"} pb="10">
              <Button
                colorScheme={"orange"}
                type="submit"
                // onClick={handleFormSubmit}
              >
                Reserve
              </Button>

              <Button colorScheme={"red"} onClick={closeModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default ReserveModal
