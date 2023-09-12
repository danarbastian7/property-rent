import React from "react"
import "./MyProfile.scss"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import ReAuth from "../reAuthUser/reAuth.component"
import moment from "moment"
import EditProfile2 from "../edit-profile/EditProfile2"
import { EditProfile } from "../../lib/editProfile/editProfile"

const MyProfile = () => {
  const { authSelector, formik, openModal, isModalOpen, closeModal } =
    EditProfile()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Center padding="25px" height="100vh" marginBottom={"15vh"}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          maxW={{ sm: "100%", md: "650px" }}
          maxH={{ sm: "546px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={8}
          // border="2px solid red"
        >
          <Flex
            flex={5}
            justifyContent={"center"}
            // alignItems={{"self-start" }}
            alignSelf={{ base: "center" }}
            maxHeight={{ base: "500px", md: "280px" }}
            maxW={"300px"}
          >
            <Avatar
              h={{ base: "278px", md: "250px" }}
              w={{ base: "278px", md: "250px" }}
              bg={useColorModeValue("white", "gray.900")}
              src={`http://localhost:8204/public/${authSelector?.profile_picture}`}
              boxShadow={"2xl"}
              mt="10px"
            />
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {authSelector.username || "username"}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {authSelector.email || "email"}
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{authSelector.role}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{authSelector.phone_number}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{moment(authSelector.birthdate).format("LL")}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #{authSelector.gender}
              </Badge>
            </Stack>

            <ButtonGroup
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"lg"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                colorScheme="whatsapp"
                cursor={"pointer"}
                onClick={openModal}
                maxW="75%"
              >
                Edit Profile
              </Button>
              {isModalOpen && (
                <EditProfile2 openModal={openModal} onClose={closeModal} />
              )}{" "}
              {authSelector.loginWith === "email" ? (
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"lg"}
                  bg={"blue.400"}
                  color={"white"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                  cursor={"pointer"}
                  onClick={onOpen}
                >
                  Change Password
                </Button>
              ) : null}
            </ButtonGroup>
          </Stack>
        </Stack>
        <ReAuth isOpen={isOpen} onClose={onClose} />
      </Center>
    </>
  )
}

export default MyProfile
