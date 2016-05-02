import getbabelRelayPlugin from 'babel-relay-plugin'
import schema from '../src/data/schema.json'

module.exports = getbabelRelayPlugin(schema.data)