import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
const MovementSnackBar = keyframes`

0% {
    left:-300px;
    bottom:25px;
  }

  100% {
    left:25px;
    bottom:25px;
  }

`

const StylesSnackBar = styled.div`
    min-width: 250px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    
    font-size: 1rem;
    animation: ${MovementSnackBar};
    animation-duration: 1s;
    animation-fill-mode: forwards;
`
const InfoBar = styled(StylesSnackBar)`
    background-color: #333;
    
`
const SuccessBar = styled(StylesSnackBar)`
    background-color: #14973b;
    
`
const WarningBar = styled(StylesSnackBar)`
    background-color: #e0d31ab9;
    
`
const ErrorBar = styled(StylesSnackBar)`
    background-color: #d60909;
    
`

export class Snackbar extends PureComponent {
    render() {
        const { message, type} = this.props;

         return (  
            <>
            {type === 'info' && <InfoBar>{message}</InfoBar>}  
            {type === 'success' && <SuccessBar><FiCheckCircle />{message}</SuccessBar>}  
            {type === 'warning' && <WarningBar>{message}</WarningBar>}  
            {type === 'error' && <ErrorBar><FiXCircle />{message}</ErrorBar>}  
            </> 
        )
    }
}



