import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Divider,
  HStack,
  Tag,
  IconButton,
  Toast,
  useDisclosure,
  useToast,
  textDecoration,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { Carousel } from "antd"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"
import RoomCard from "../../components/room/RoomCard"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { BiEditAlt } from "react-icons/bi"

import { Badge, Popover } from "antd"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useSelector } from "react-redux"
import { DetailPropertyFunc } from "../../lib/detailProperty/detailProperty"
import { RoomFunc } from "../../lib/roomFunc/roomFunc"

const ListingDetails = () => {
  const authSelector = useSelector((state) => state.auth)
  const [listing, setListing] = useState([])
  const [getDateRooms, setGetDateRooms] = useState([])

  const params = useParams()
  const toast = useToast()
  const { roomCard, images, room, fetchPropertyById } = DetailPropertyFunc()
  const { deleteRoom } = RoomFunc()

  console.log(listing, "listing")
  console.log(roomCard, "listing2")

  const renderRoomCard = () => {
    return room.map((val) => {
      return (
        <RoomCard
          id={val.id}
          item_name={val.item_name}
          capacity={val.capacity}
          price={val.price}
          description={val.description}
          images={val.Images}
          onDelete={() => deleteRoom(val.id)}
          calendars={val.Calendars}
          fetchListingDetails={fetchPropertyById}
        />
      )
    })
  }

  return (
    <Container maxWidth="4xl" mt="100px">
      <HStack p="3" pl="1" pr="1" justifyContent={"space-between"}>
        <Link to={`/tenant/${authSelector.id}`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-Label="Option"
            icon={<BiEditAlt />}
            variant="outline"
            border="none"
            backgroundColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            cursor="pointer"
            textColor="black"
            textDecor="none"
          />
          <MenuList>
            <MenuItem>
              <Link to={`/property/edit/${params.id}`}>Edit Property</Link>
            </MenuItem>
            <MenuItem>
              <Link to={`/property/image/${params.id}`}>
                Edit Property Image
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
        {/* ================================================ */}
      </HStack>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 18, md: 17 }}
      >
        <Carousel autoplay effect="fade" nextArrow={StackDivider}>
          {images?.map((val) => (
            <Image
              // src={`${process.env.REACT_APP_IMG}${val.image_url}`}
              src={`http://localhost:8204/public/${val.image_url}`}
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              // w={"100%"}
              h={{ base: "300px", sm: "350px", lg: "400px" }}
            />
          ))}
        </Carousel>

        <Stack spacing={{ base: 6, md: 5 }}>
          <VStack as={"header"} alignItems="start">
            <Heading
              //lineHeight={2}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {roomCard.name}
            </Heading>

            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"md"}
              fontWeight={"300"}
            >
              {roomCard.address}, {roomCard?.City?.cities_name}
            </Text>
            <Tag
              size={"md"}
              variant="solid"
              colorScheme="yellow"
              fontSize={"xl"}
            >
              {roomCard?.Category?.category_name}
            </Tag>
          </VStack>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Text fontSize={"md"}>{roomCard.description}</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Box py={{ base: 18, md: 7 }}>
        <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />
        <HStack justifyContent={"space-between"}>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={useColorModeValue("yellow.500", "yellow.300")}
            fontWeight={"500"}
            textTransform={"uppercase"}
            my={"4"}
          >
            Rooms
          </Text>
          <IconButton backgroundColor={"unset"} _hover={"unset"}>
            <Link to={`/inputroom?id=${roomCard.id}`}>
              <GrAdd size="25px" />
            </Link>
          </IconButton>
        </HStack>

        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {renderRoomCard()}
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default ListingDetails
