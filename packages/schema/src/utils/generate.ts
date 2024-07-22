import fs from 'node:fs'
import { OpenDesignSystemSchema } from '../schemas'
import { Type } from '@sinclair/typebox'

const schema = Type.Strict(OpenDesignSystemSchema)

console.log('📦 Building - Open Design System schema')

if (!fs.existsSync('./assets')) {
  fs.mkdirSync('./assets')
}

fs.writeFileSync('./assets/open-design-system-schema.json', JSON.stringify(schema, null, 2))

console.log('✅ Done - Open Design System schema')
