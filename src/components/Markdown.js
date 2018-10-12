import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { Container, Content } from 'native-base'
import MarkdownRenderer from 'react-native-markdown-renderer'
import FitImage from 'react-native-fit-image'

const StyledContent = styled(Content)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  /* color: #faf7ff;
  background: #353535; */
`

export default class Markdown extends Component {
  render() {
    const { content } = this.props

    const rules = {
      image: (node, children, parent, styles) => {
        if (!node.attributes.src.startsWith('https://')) {
          const img = repository.object.entries.find(
            element => node.attributes.src === element.name
          )
        }
        return (
          <FitImage
            indicator={true}
            key={node.key}
            style={styles.image}
            source={{ uri: node.attributes.src }}
          />
        )
      }
    }

    return (
      <StyledContent>
        <MarkdownRenderer>{content}</MarkdownRenderer>
      </StyledContent>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#FAF7FF',
    backgroundColor: '#353535'
  }
})
