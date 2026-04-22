"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params:string="Hello  e"
  return (
    <div>{params}</div>
  )
}

export default page