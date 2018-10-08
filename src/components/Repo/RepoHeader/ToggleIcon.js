import React from 'react'
import { Button, Icon, Text } from 'native-base'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  padding-left: 5;
  padding-right: 5;
  margin-left: 0;
  margin-right: 0;
  justify-content: center;
  align-items: center;
`

const ButtonIcon = styled(Icon)`
  height: 24px;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 5;
  color: rgba(211, 210, 255, 1);
`

const ButtonText = styled(Text)`
  font-size: 14px;
  padding-left: 0;
  padding-right: 0;
  color: rgba(211, 210, 255, 1);
`

const ToggleIcon = ({ iconName, label }) => (
  <StyledButton transparent vertical>
    <ButtonIcon name={iconName} type="FontAwesome" />
    <ButtonText>{label}</ButtonText>
  </StyledButton>
)

export default ToggleIcon
