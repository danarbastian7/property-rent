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
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { EditProfile } from "../../lib/editProfile/editProfile"
import { BiUpload } from "react-icons/bi"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import countryPhoneCodes from "../../db/phone_code.json"
import { useState } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

const EditProfile2 = ({ onUpdateAndClose, onClose, openModal }) => {
  const {
    formChangeHandler,
    formik,
    authSelector,
    optionSelect,
    beforeUpload,
    handleImageChange,
    selectedImage,
  } = EditProfile()

  const handleFormSubmit = async () => {
    try {
      formik.handleSubmit()
      onClose()
    } catch (err) {
      console.error("Error during form submission:", err)
    }
  }
  const [selectedCountry, setSelectedCountry] = useState("")
  const handleChangeCountry = (e) => {
    setSelectedCountry(e.target.value)
  }
  const selectedCode =
    countryPhoneCodes.find((item) => item.country === selectedCountry)?.code ||
    ""

  return (
    // <Box width={{ base: "300px" }}>
    <ChakraProvider>
      <Modal isOpen={true} onClose={openModal} size={{ base: "md", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your data profile</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody pb={6}>
            <Center>
              <Box textAlign="center">
                <Avatar
                  name="profile_picture"
                  height={"220px"}
                  width={"220px"}
                  src={
                    selectedImage ||
                    `http://localhost:8204/public/${authSelector?.profile_picture}`
                  }
                  onChange={(event) =>
                    formik.setFieldValue(
                      "profile_picture",
                      event.target.files[0]
                    )
                  }
                  alignItems="center"
                  justifyContent={"center"}
                  marginBottom="30px"
                />
                <InputGroup
                  width={"200px"}
                  alignItems="center"
                  justifyContent={"center"}
                  mx="auto"
                >
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<Icon as={BiUpload} />}
                  />

                  <Input
                    type={"file"}
                    accept="image/jpeg, image/png, image/gif"
                    height="100%"
                    onChange={handleImageChange}
                  />
                </InputGroup>
              </Box>
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
                borderColor="black"
                textColor={"gray.300"}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone number</FormLabel>

              <InputGroup>
                {/* <Select
                  value={selectedCountry}
                  onChange={handleChangeCountry}
                  borderEndRadius={"none"}
                  width={"200px"}
                  name="phone_number"
                >
                  {countryPhoneCodes.map((val) => (
                    <option key={val.dial_code} value={val.dial_code}>
                      {val.flag} {val.code}
                      <br />
                      {val.dial_code}
                    </option>
                  ))}
                </Select> */}
                <InputLeftAddon children="+62" />
                <Input
                  type={"tel"}
                  name="phone_number"
                  //   value={selectedCountry}
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
