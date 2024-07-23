import { TypeCompiler, ValueError } from '@sinclair/typebox/compiler'
import { OpenDesignSystemSchema } from './schemas'

const Compiler = TypeCompiler.Compile(OpenDesignSystemSchema)

export class OpenDSValidationError extends Error {
  constructor(public errors: Array<ValueError>) {
    super('Open Design Syste Validation Error')
  }
}

export default function Validator(odsObject: any): OpenDesignSystemSchema {
  if (Compiler.Check(odsObject)) {
    return odsObject
  } else {
    throw new OpenDSValidationError(Array.from(Compiler.Errors(odsObject)))
  }
}
