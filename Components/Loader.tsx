import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Flex } from './User/Flex'

const RotateAnimation = keyframes`
    0% {
       transform: rotateZ(0deg) 
    }
    100% {
        transform: rotateZ(360deg);
    }

`

const LoaderContainer = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 12px dashed grey;
    animation: ${RotateAnimation} 2s infinite linear;
    
`

export default function Loader() {
  return (
    <Flex justify='center' margin='50px 0 0 0'> <LoaderContainer /></Flex>
  )
}
