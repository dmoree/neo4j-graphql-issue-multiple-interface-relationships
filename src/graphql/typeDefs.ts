import gql from 'graphql-tag'

export const typeDefs = gql`
  interface Entity {
    id: String!
  }

  type Person implements Entity {
    id: String! @unique
    name: String!
  }

  type Place implements Entity {
    id: String! @unique
    location: Point!
  }

  type Interaction {
    id: ID! @id
    kind: String!
    subjects: [Entity!]! @relationship(type: "ACTED_IN", direction: IN)
    objects: [Entity!]! @relationship(type: "ACTED_IN", direction: OUT)
  }
`
