import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useSelector } from "react-redux"
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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = DetailPropertyFunc()
  const { datePickerStyles, inputStyles } = ReactCalendar()
  const selector = useSelector((state) => state.room)
  const selectedStartDate = startDate
  const { formChangeHandler, formik } = TransactionFunc(selectedStartDate)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }
  const handleDateChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
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
        <form onSubmit={handleFormSubmit}>
          <ModalContent>
            <ModalHeader>Make your reservation</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={formik.errors.first_name}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type={"text"}
                  // pattern="[A-Za-z]+"
                  name="first_name"
                  onChange={formChangeHandler}
                  value={formik.values.first_name}
                  isRequired
                />
                <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.last_name}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type={"text"}
                  // pattern="[A-Za-z]+"
                  name="last_name"
                  onChange={formChangeHandler}
                  value={formik.values.last_name}
                  isRequired
                />
                <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
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
                  minDate={moment().toDate()}
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
                    value={selector.total_price}
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
