import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  Divider,
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
  useDisclosure,
} from "@chakra-ui/react"
import { EditProfile } from "../../lib/editProfile/editProfile"

const EditProfile2 = ({ onUpdateAndClose, onClose, openModal }) => {
  const {
    formChangeHandler,
    formik,
    authSelector,
    optionSelect,
    beforeUpload,
  } = EditProfile()

  const handleFormSubmit = async () => {
    try {
      // Your form submission logic here (e.g., making an API request)

      // Assuming the form submission was successful
      // Close the modal and reset the form
      formik.handleSubmit()
      onClose() // Close the modal
    } catch (err) {
      console.error("Error during form submission:", err)
      // Handle any errors here (e.g., display an error message)
    }
  }
  return (
    // <Box width={{ base: "300px" }}>
    <ChakraProvider>
      <Modal isOpen={true} onClose={openModal} size={{ base: "md", md: "lg" }}>
        <ModalOverlay />
        <ModalContent
          containerProps={{
            padding: "20rem",
          }}
        >
          <ModalHeader>Edit your data profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <Avatar
                height={"220px"}
                width={"220px"}
                src={`http://localhost:8204/public/${authSelector?.profile_picture}`}
                alignItems="center"
                justifyContent={"center"}
                marginBottom="50px"
              />
            </Center>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                name="username"
                onChange={formChangeHandler}
                defaultValue={authSelector.username}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                name="email"
                onChange={formChangeHandler}
                defaultValue={authSelector.email}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone number</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+62" />
                <Input
                  type={"tel"}
                  name="phone_number"
                  placeholder="Phone number"
                  onChange={formChangeHandler}
                  defaultValue={authSelector.phone_number}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Birthdate</FormLabel>
              <Input
                type={"date"}
                placeholder="Brithdate"
                name="birthdate"
                onChange={formChangeHandler}
                defaultValue={authSelector.birthdate}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder="Select gender"
                name="gender"
                onChange={formChangeHandler}
                defaultValue={authSelector.gender}
              >
                <option>Male</option>
                <option>Female</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter gap={"3"} pb="10">
            <Button colorScheme={"linkedin"} onClick={handleFormSubmit}>
              Update
            </Button>
            <Button colorScheme={"red"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
    // </Box>
  )
}

export default EditProfile2
