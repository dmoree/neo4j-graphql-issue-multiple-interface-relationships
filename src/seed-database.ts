import {
  clearDatabase,
  connect,
  disconnect,
  debug,
} from '@issue/neo4j/database'
import { ogm } from '@issue/neo4j/graphql'

export const seed = async () => {
  await ogm.model('Person').create({
    input: [
      { id: 'adam', name: 'Adam' },
      { id: 'eve', name: 'Eve' },
      { id: 'cain', name: 'Cain' },
    ],
  })

  await ogm.model('Interaction').create({
    input: [
      {
        subjects: { connect: { where: { node: { id_IN: ['adam', 'eve'] } } } },
        kind: 'PARENT_OF',
        objects: { connect: { where: { node: { id_IN: ['cain'] } } } },
      },
    ],
  })
}

const seedDatabase = async () => {
  try {
    await connect()
    await clearDatabase()
    debug('Seeding started...')
    await seed()
    debug('Seeding Finished')
    await disconnect()
  } catch (error) {
    debug(`Error seeding database: ${error.message}`)
    process.exit(1)
  }
}

seedDatabase()
