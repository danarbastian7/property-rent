import {
  Alert,
  AlertIcon,
  Avatar as Avatar2,
  Badge,
  Box,
  Button as Button2,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  WrapItem,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { async } from "@firebase/util"
import { Carousel } from "antd"
import { GrFormNext } from "react-icons/gr"
import { Calendar, Avatar, List, message, Button, Result } from "antd"
import moment from "moment"
import ReserveModal from "./ReserveModal"

const DetailProperty = () => {
  // const reserveModal = useDisclosure()
  const [room, setRoom] = useState([])
  const [property, setProperty] = useState([])
  const [images, setImages] = useState([])
  const [getDateRooms, setGetDateRooms] = useState()
  const navigate = useNavigate()

  const params = useParams()

  const fetchRoom = async () => {
    try {
      const response = await axiosInstance.get(`/room/${params.id}`)

      setRoom(response.data.data.PropertyItems)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProperty = async () => {
    try {
      const response = await axiosInstance.get(`/property/${params.id}`)

      setProperty(response.data.data)
      setImages(response.data.data.PropertyImages)
    } catch (err) {
      console.log(err)
    }
  }

  //=============================

  const getDateRoom = async () => {
    try {
      const responseData = await axiosInstance.get(`/calendar/${params.id}`)
      setGetDateRooms(responseData.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(getDateRooms, "coba")

  const newFormatted = getDateRooms?.map((dateRoom) => {
    const date = new Date(dateRoom?.startDate)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedNewDate = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`

    dateRoom.formattedNewDate = formattedNewDate
    // console.log(formattedNewDate, "coba2")
    return dateRoom
  })

  // const findDate = (value) => {
  //   console.log(value.format("YYYYMMDD"), "format")
  // }

  //=============================
  // const getUserReview = property?.Reviews

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    padding: 0,
  }

  useEffect(() => {
    fetchRoom()
    fetchProperty()
    getDateRoom()
  }, [])
  return (
    <Center>
      <Container mt={"100px"} maxW={{ base: "100vw", md: "1298px" }} mb="25vh">
        <Link to={`/`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Carousel autoplay effect="fade" dotPosition="bottom" easing="linear">
          {images?.map((val) => (
            <Image
              style={contentStyle}
              //   src={val.image_url}

              src={`http://localhost:8204/public/${val.image_url}`}
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              w={"50%"}
              h={{ base: "350px", sm: "400px", lg: "500px" }}
            />
          ))}
        </Carousel>

        <Divider color={"GrayText"} height="10px" />

        <br />
        <Grid templateColumns={"repeat(2, 2fr)"} gap="10">
          <GridItem>
            <HStack paddingBottom={"10px"}>
              <Avatar2
                name={property?.User?.username}
                // src={`${process.env.REACT_APP_IMG}${property?.User?.profile_picture}`}
                src={`http://localhost:8204/public/${property?.User?.profile_picture}`}
              />
              <Text>Hosted by {property.User?.username}</Text>
            </HStack>
            <Text>{property.name}</Text>
            <Badge colorScheme={"linkedin"}>
              {property?.Category?.category_name}
            </Badge>
            <Text fontSize={"12px"}>
              {property?.address}, {property?.City?.cities_name}
            </Text>
            <br />
            <Text fontFamily={"sans-serif"} fontSize={"13.5px"}>
              {property?.description}
            </Text>
            {/* <Link to="/dummy-transaction">
              <Button2
                colorScheme={"orange"}
                ml="0"
                width={"100%"}
                color="white"
                // onClick={reserveModal.onOpen}
                cursor="pointer"
              >
                Reserve
                <GrFormNext size={"25px"} />
              </Button2>
            </Link> */}
            <ReserveModal />

            {room.length !== 0 ? (
              <>
                <Box color={"blue"} textAlign="center" mt={"50px"}>
                  <Text>Full booked day information</Text>
                </Box>

                {getDateRooms?.length !== 0 ? (
                  getDateRooms?.map((val) => (
                    <>
                      <Text>Room type: {val.PropertyItem?.item_name}</Text>
                      <Text fontSize={{ base: "13px" }}>
                        Date: {moment(val.startDate).format("LL")}
                      </Text>
                      <Divider color={"gray.400"} />
                    </>
                  ))
                ) : (
                  <Alert status="success">
                    <AlertIcon />
                    All room type is available now
                  </Alert>
                )}
              </>
            ) : null}
          </GridItem>
          <GridItem>
            <Text>Available rooms:</Text>
            {room.length === 0 ? (
              <Alert status="error">
                <AlertIcon />
                Sorry, no room available now
              </Alert>
            ) : (
              room.map((val) => (
                <Box
                  border={"2px solid"}
                  w={{ base: "200px", md: "300px" }}
                  rounded={"md"}
                  mb={"10px"}
                  borderColor="teal.300"
                  backgroundColor="linkedin.400"
                  color={"white"}
                  fontWeight="extrabold"
                >
                  <Box
                    backgroundColor={"white"}
                    // border="2px solid red"
                    maxHeight={{ base: "200px", md: "300px" }}
                  >
                    <Carousel
                      autoplay
                      effect="fade"
                      dotPosition="left"
                      dots={false}
                      easing="linear"
                      // style={contentStyle}
                    >
                      {val.Images.map((value) => (
                        <Image
                          // src={`${process.env.REACT_APP_IMG}${value.picture_url}`}
                          src={`http://localhost:8204/public/${value.picture_url}`}
                          rounded={"md"}
                          fit={"cover"}
                          alignItems={"center"}
                          justifyContent="center"
                          maxW={"100%"}
                        />
                      ))}
                    </Carousel>
                  </Box>

                  <Text
                    fontFamily={"sans-serif"}
                    fontSize={{ base: "13.5px", md: "20px" }}
                  >
                    Room: {val.item_name} type
                  </Text>
                  <Text
                    color={"white"}
                    fontSize={{ base: "x-small", md: "md" }}
                  >
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    }).format(val.price)}
                    / room / night
                  </Text>
                  <Text
                    color={"white"}
                    fontSize={{ base: "x-small", md: "md" }}
                  >
                    Max. capacity: {val.capacity} People
                  </Text>
                  <Text
                    color={"white"}
                    fontSize={{ base: "x-small", md: "md" }}
                  >
                    {val.description}
                  </Text>
                </Box>
              ))
            )}

            <Text mt={"20px"}>Reviews:</Text>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              border="1px solid"
              borderColor={"gray.300"}
              borderRadius={"5px"}
            >
              {property?.Reviews?.map((val) => (
                <>
                  <HStack>
                    <Avatar2
                      size={"md"}
                      src={`${process.env.REACT_APP_IMG}${val.User.profile_picture}`}
                    />
                    <VStack>
                      <Text fontSize={"15px"}>{val.User.username}</Text>
                      <Text fontSize="13px" color={"gray.400"}>
                        {moment(val.createdAt).utc().format("LL")}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text mt={"5px"} fontSize="15px" fontStyle={"italic"}>
                    {val.review}
                  </Text>
                </>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Center>
  )
}

export default DetailProperty
