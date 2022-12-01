import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import { safeMint } from "../utils/scripts"
import axios from "axios"

export default function Home() {
  const [fileImg, setFileImg] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [sponsor, setSponsor] = useState("")
  const [promo, setPromo] = useState("")

  // console.log(fileImg, name, description, sponsor, promo)
  const walletAddress = process.env.REACT_APP_ADDRESS

  const sendJSONtoIPFS = async ImgHash => {
    try {
      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          name: name,
          description: description,
          attributes: [
            {
              trait_type: sponsor,
              value: promo,
            },
          ],
          image: ImgHash,
        },
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API,
          pinata_secret_api_key: process.env.REACT_APP_SECRET_KEY_PINATA,
        },
      })
      const tokenURI = `ipfs://${resJSON.data.IpfsHash}`
      console.log("Token URI", tokenURI)
      // mintNFT(tokenURI, currentAccount)
      safeMint(walletAddress, tokenURI).then(() => {
        // setLoading(false)
        // setCounter(counter + 1)
        console.log("sucess")
      })
    } catch (error) {
      console.log("JSON to IPFS: ")
      console.log(error)
    }
  }

  const sendFileToIPFS = async e => {
    e.preventDefault()
    // setLoading(true)
    try {
      if (fileImg) {
        const formData = new FormData()
        formData.append("file", fileImg)

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API,
            pinata_secret_api_key: process.env.REACT_APP_SECRET_KEY_PINATA,
            "Content-Type": "multipart/form-data",
          },
        })

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`
        sendJSONtoIPFS(ImgHash)
      }
    } catch (error) {
      console.log(error)
    }

    // if (fileImg) {
    //   try {
    //     const formData = new FormData()
    //     formData.append("file", fileImg)

    //     const resFile = await axios({
    //       method: "post",
    //       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //       data: formData,
    //       headers: {
    //         pinata_api_key: pinataKey,
    //         pinata_secret_api_key: pinataSecret,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })

    //     const ImgHash = `ipfs://${resFile.data.IpfsHash}`
    //     console.log(ImgHash)
    //     sendJSONtoIPFS(ImgHash)
    //   } catch (error) {
    //     console.log("Error sending File to IPFS: ")
    //     console.log(error)
    //   }
    // }
    console.log("funciona envio")
  }

  const clearData = () => {
    setName("")
    setDescription("")
    setSponsor("")
    setPromo("")
  }

  return (
    <form onSubmit={sendFileToIPFS}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Creación de NFT
            </Heading>
          </Center>

          <FormControl>
            <FormLabel>Subir imagen</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Input
                type="file"
                placeholder="subir imagen"
                size="md"
                p={1}
                onChange={e => setFileImg(e.target.files[0])}
              />
            </Stack>
          </FormControl>

          <FormControl id="name">
            <FormLabel>Nombre NFT</FormLabel>
            <Input
              placeholder="Nombre NFT"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Descripción</FormLabel>
            <Textarea
              value={description}
              placeholder="Descripción NFT"
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="sponsor">
            <FormLabel>Sponsor y promoción</FormLabel>
            <Input
              placeholder="Sponsor"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={sponsor}
              onChange={e => setSponsor(e.target.value)}
            />
          </FormControl>

          <FormControl id="promo">
            <Input
              placeholder="Promoción"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={promo}
              onChange={e => {
                setPromo(e.target.value)
              }}
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={clearData}
            >
              Limpiar texto
            </Button>

            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Mintear NFT
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  )
}
