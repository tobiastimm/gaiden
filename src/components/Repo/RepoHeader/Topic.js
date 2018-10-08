import React, { Component } from 'react'
import { Text } from 'native-base'
import styled from 'styled-components'

const StyledText = styled(Text)`
  color: rgba(211, 210, 255, 1);
  background-color: rgba(109, 108, 214, 1);
  padding: 4px;
  font-size: 12px;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
`

const Topic = ({ children }) => <StyledText>{children}</StyledText>

export default Topic
