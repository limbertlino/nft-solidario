import React from "react"
import { useState } from "react"
import { getName, verDato } from "../utils/scripts"

const Test = () => {
  const [name, setName] = useState("")
  const handlerName = async () => {
    try {
      const name = await getName()
      setName(name)
    } catch (error) {
      console.log(error)
    }
  }

  handlerName()
  // const handlerName = () => {
  //   getName().then(data => setName(data))
  // }
  // console.log(name)
  // handlerName()
  return <div>{name}</div>
}

export default Test
