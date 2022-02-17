import styled from 'styled-components';

type Props = {
    height: string
    margin: string
    mediaMargin: string
}
const StyledInput = styled.input<Props>`
    outline: none;
    height: ${({height}) => height};
    background: #D0D0D0;
    border: none;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 0 0 25px;

    ::placeholder {
        color: #000000;
    }

    :nth-child(1) {
        margin: ${({margin}) => margin}
    }

    @media all and (max-width: 470px) {
        width: 80%;
        margin: 0 0 10px 0;
        height: 35px;

        :nth-child(1) {
            margin: ${({mediaMargin}) => mediaMargin};
        }
    }
`;

export const Input = ({value, setValue, type="", placeholder, height, margin="0px", mediaMargin="0px", list=""}) => {
    return (<StyledInput 
            list={list}
            height={height} 
            margin={margin} 
            mediaMargin={mediaMargin}
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={(e: { target: { value: string | number; }; })=>setValue(e.target.value)} 
            required/>)
}