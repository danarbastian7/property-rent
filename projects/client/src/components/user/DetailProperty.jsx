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
  Grid,
  GridItem,
  HStack,
  Image,
  StackDivider,
  Text,
  useBreakpointValue,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { GrLinkPrevious } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { Carousel } from "antd"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
// ==================

import moment from "moment"
import ReserveModal from "./ReserveModal"

import { DetailPropertyFunc } from "../../lib/detailProperty/detailProperty"

const DetailProperty = () => {
  const [getDateRooms, setGetDateRooms] = useState()
  const navigate = useNavigate()
  const params = useParams()

  const { roomCard, images, propertyItem } = DetailPropertyFunc()
  // console.log(roomCard, "rooms")

  // const newFormatted = getDateRooms?.map((dateRoom) => {
  //   const date = new Date(dateRoom?.startDate)

  //   const year = date.getFullYear()
  //   const month = date.getMonth() + 1
  //   const day = date.getDate()
  //   const formattedNewDate = `${year}${month.toString().padStart(2, "0")}${day
  //     .toString()
  //     .padStart(2, "0")}`

  //   dateRoom.formattedNewDate = formattedNewDate
  //   // console.log(formattedNewDate, "coba2")
  //   return dateRoom
  // })

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    padding: 0,
  }

  return (
    <Center>
      <Container mt={"100px"} maxW={{ base: "100vw", md: "1298px" }} mb="25vh">
        <Link to={`/`}>
          <GrLinkPrevious size={"25px"} />
        </Link>

        <Grid templateColumns={{ md: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
          <GridItem w="100%">
            <Box
              maxWidth={"500px"}
              height={"450px"}
              rounded={"md"}
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <Swiper navigation={true} modules={[Navigation]}>
                {images.map((val, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:8204/public/${val.image_url}`}
                      alt={`Image ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </GridItem>
          <GridItem w="100%">
            <Box>
              <Text>Available rooms:</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {propertyItem.length === 0 ? (
                  <Alert status="error">
                    <AlertIcon />
                    Sorry, no room available now
                  </Alert>
                ) : (
                  propertyItem.map((val) => (
                    <GridItem w="100%">
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
                          fontSize={{ base: "10px", md: "15px" }}
                        >
                          Room: {val.item_name} type
                        </Text>
                        <Text
                          color={"white"}
                          fontSize={{ base: "10px", md: "15px" }}
                        >
                          {new Intl.NumberFormat("ja-JP", {
                            style: "currency",
                            currency: "JPY",
                          }).format(val.price)}
                          / room / night
                        </Text>
                        <Text
                          color={"white"}
                          fontSize={{ base: "10px", md: "15px" }}
                        >
                          Max. capacity: {val.capacity} People
                        </Text>
                      </Box>
                    </GridItem>
                  ))
                )}
              </Grid>
            </Box>
          </GridItem>
        </Grid>

        <Divider color={"GrayText"} height="10px" />
        <br />
        <Grid templateColumns={"repeat(2, 2fr)"} gap="10">
          <GridItem>
            <HStack paddingBottom={"10px"}>
              <Avatar2
                name={roomCard?.User?.username}
                // src={`${process.env.REACT_APP_IMG}${property?.User?.profile_picture}`}
                src={`http://localhost:8204/public/${roomCard?.User?.profile_picture}`}
              />
              <Text>Hosted by {roomCard.User?.username}</Text>
            </HStack>
            <Text>{roomCard.name}</Text>
            <Badge colorScheme={"linkedin"}>
              {roomCard?.Category?.category_name}
            </Badge>
            <Text fontSize={"12px"}>
              {roomCard?.address}, {roomCard?.City?.cities_name}
            </Text>
            <br />
            <Text fontFamily={"sans-serif"} fontSize={"13.5px"}>
              {roomCard?.description}
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

            {/* {roomCard.length !== 0 ? (
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
            ) : null} */}
          </GridItem>
          {/* <GridItem>
            <Text mt={"20px"}>Reviews:</Text>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              border="1px solid"
              borderColor={"gray.300"}
              borderRadius={"5px"}
            >
              {roomCard?.Reviews?.map((val) => (
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
          </GridItem> */}
        </Grid>
      </Container>
    </Center>
  )
}

export default DetailProperty
