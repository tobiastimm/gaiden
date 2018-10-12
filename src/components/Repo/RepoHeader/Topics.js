import React from 'react'
import styled from 'styled-components'
import Topic from './Topic'

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 5px;
`

const Topics = ({ data }) => (
  <Container>
    {data.map(({ node }) => (
      <Topic key={node.topic.id}>{node.topic.name}</Topic>
    ))}
  </Container>
)

export default Topics
