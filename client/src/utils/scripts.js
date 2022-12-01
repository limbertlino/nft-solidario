//paquete ethers
const { ethers } = require("ethers")
const { abi } = require("../utils/abi")

//proveedor de binance chain
const bscProvider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  { name: "binance test-net", chainId: 97 }
)

const addressNFT = process.env.REACT_APP_NFT_ADDRESS
const key = process.env.REACT_APP_ADDRESS_KEY
// keys de pinata para txs del nft. subir imagen y luego subir json a pinata

//contract para interactuar con ethers

const contract = new ethers.Contract(addressNFT, abi, bscProvider)

//firma txs
const signer = new ethers.Wallet(key, bscProvider)

//contract firmado
const contractSigned = new ethers.Contract(addressNFT, abi, signer)

// Ver metadatos de un NFT
// const viewURI = async id => {
//   try {
//     const URI = await contract.tokenURI(id)
//     console.log(URI)
//   } catch (error) {
//     console.log(error)
//   }
// }

// // obtener simbolo del smart contract del nft
// const getSymbol = async () => {
//   try {
//     const symbol = await contractSigned.symbol()
//     console.log(symbol)
//     return symbol
//   } catch (getSymbolError) {
//     console.log(getSymbolError)
//   }
// }

// Obtener nombre del smart contract
const getName = async () => {
  try {
    const name = await contract.name()
    // console.log(name)
    return name
  } catch (error) {
    console.log(error)
  }
}

//* Comprobar si metamask esta instalado
const isMetamaskInstalled = async () => {
  if (window.ethereum) console.log("Si, Metamask esta instalado")
  if (!window.ethereum) console.log("No, Metamask no esta instalado")
}

//Mintear NFT
const safeMint = async (address, URI) => {
  try {
    const mint = await contractSigned.safeMint(address, URI)
    const response = await mint
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const verDato = () => {
  console.log(key)
  console.log(addressNFT)
  console.log(abi)
}

module.exports = { getName, verDato, isMetamaskInstalled , safeMint}
