import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

export const DetailPropTenantFunc = () => {
  const Menu = ["Properties", "Order", "Finances"]
  const [listing, setListing] = useState([])
  const params = useParams()

  const fetchListing = async () => {
    try {
      const response = await axiosInstance.get(`/tenant/${params.id}`)

      setListing(response.data.data.Properties)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchListing()
  }, [])
  return {
    listing,
    Menu,
  }
}
