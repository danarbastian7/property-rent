import ListingRow from "../../components/room/ListingRow"
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Menu,
  MenuButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { Link, NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DetailPropTenantFunc } from "../../lib/detailPropertyTenant/detailPropertyTenant"

const Listing = () => {
  const authSelector = useSelector((state) => state.auth)

  const { listing, Menu } = DetailPropTenantFunc()

  const renderListingRow = () => {
    return listing.map((val) => {
      return (
        <ListingRow
          id={val.id}
          name={val.name}
          properties={val.PropertyImages}
          address={val.address}
          city={val.City}
        />
      )
    })
  }

  return (
    <Box
      mt={{ base: "50px", md: "100px" }}
      boxShadow={
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
      }
      padding={"10px"}
      width={{ base: "550px", md: "-webkit-fit-content" }}
      backgroundColor={"whiteAlpha.900"}
      pb="100px"
      mb="20vh"
    >
      <Box backgroundColor={"orange.400"}>
        <HStack as="nav" cursor={"pointer"}>
          <Link to="/">
            <Button
              color={"white"}
              cursor="pointer"
              backgroundColor={"orange.400"}
              _hover={{ backgroundColor: "orange.300" }}
              fontSize={"15px"}
            >
              Properties
            </Button>
          </Link>
          <Link to={`/orderlist?id=${authSelector.id}`}>
            <Button
              color={"white"}
              cursor="pointer"
              _hover={{ backgroundColor: "orange.300" }}
              backgroundColor={"orange.400"}
              fontSize={"15px"}
            >
              Order List
            </Button>
          </Link>

          <Link to={`/`}>
            <Button
              color={"white"}
              cursor="pointer"
              _hover={{ backgroundColor: "orange.300" }}
              backgroundColor={"orange.400"}
              fontSize={"15px"}
            >
              Finances
            </Button>
          </Link>
        </HStack>
      </Box>
      <VStack>
        <Box
          maxW="350px"
          borderRadius={"15px"}
          mb={"20px"}
          mt={{ base: "5px", md: "0px" }}
          padding="10px"
        ></Box>
        <Box>
          <Center>
            <HStack mb="2" p="3" pl="1" pr="1">
              <Heading
                fontFamily={"sans-serif"}
                fontWeight="bold"
                fontSize={"2xl"}
              >
                Your List of Properties
              </Heading>
              <Link to="/property-form">
                <GrAdd size={"25px"} />
              </Link>
            </HStack>
          </Center>

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(4, 2fr)",
            }}
            padding="5px"
            gap={{ base: "0", md: "10px" }}
          >
            {renderListingRow()}
          </Grid>
        </Box>
      </VStack>
    </Box>
  )
}

export default Listing
