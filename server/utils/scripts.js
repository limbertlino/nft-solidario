//paquete ethers
const { ethers } = require("ethers")

//proveedor de binance chain
const bscProvider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  { name: "binance test-net", chainId: 97 }
)

// keys de pinata para txs del nft. subir imagen y luego subir json a pinata

const pinataKey = "93c4f9b68154e4c57e7b"
const pinataSecret =
  "53cc15509bfdf113e4aea9aba84649f3ddcc10042e2e8c2f4672b89bd29d2fdc"

//contract para interactuar con ethers

const contract = new ethers.Contract(addressNFT, abi, provider)

//firma txs
const signer = new ethers.Wallet(key, bscProvider)

//contract firmado
const contractSigned = new ethers.Contract(nftAddress, BEP721_ABI, signer)

// Ver metadatos de un NFT
const viewURI = async id => {
  try {
    const URI = await contract.tokenURI(id)
    console.log(URI)
  } catch (error) {
    console.log(error)
  }
}

// obtener simbolo del smart contract del nft
const getSymbol = async () => {
  try {
    const symbol = await contractSigned.symbol()
    console.log(symbol)
    return symbol
  } catch (getSymbolError) {
    console.log(getSymbolError)
  }
}

// Obtener nombre del smart contract
const getName = async () => {
  try {
    const name = await contract.name()
    console.log(name)
    return name
  } catch (error) {
    console.log(error)
  }
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
