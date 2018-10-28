import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import styled from 'styled-components'
import { Container, Content } from 'native-base'
import MarkdownRenderer from 'react-native-markdown-renderer'
import FitImage from 'react-native-fit-image'
import textStyles from '../styles/textStyles'

const StyledContent = styled(Content)`
  margin: 5px 15px;
  color: ${textStyles.color};
  background: ${textStyles.backgroundColor};
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
        <MarkdownRenderer style={styles}>{content}</MarkdownRenderer>
      </StyledContent>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    ...textStyles,
    fontSize: 16
  },
  codeBlock: {
    ...textStyles,
    backgroundColor: '#424242',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  codeInline: {
    ...textStyles,
    backgroundColor: '#424242',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  bullet_list: {
    ...textStyles
  }
})
