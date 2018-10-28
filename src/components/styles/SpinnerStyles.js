import { Spinner } from 'native-base'
import styled from 'styled-components'
import theme from '../../styles/theme'

export const FullSpinner = styled(Spinner)`
  flex: 1;
  background: ${theme.palette.black};
`
