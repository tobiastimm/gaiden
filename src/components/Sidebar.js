import React from 'react'
import { AppRegistry, Image, ImageBackground, StatusBar } from 'react-native'
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  StyleProvider
} from 'native-base'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'

const routes = ['Home', 'Trending']
export default class SideBar extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Content>
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri:
                  'https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png'
              }}
            />
            <List
              dataArray={routes}
              renderRow={data => {
                return (
                  <ListItem
                    button
                    onPress={() => this.props.navigation.navigate(data)}
                  >
                    <Text>{data}</Text>
                  </ListItem>
                )
              }}
            />
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}
