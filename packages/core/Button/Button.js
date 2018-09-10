import React from 'react'
import styled from 'styled-components'
import Div from 'Div'

const Button = styled.button`
  height: 70px;
  font-weight: bold;
  color: white;
  background-color: blue;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
  &:focus {
    background-color: green;
  }
`

export default (props) => (
  <Div>
    <Button {...props} />
  </Div>
)