import { FileDriver } from './FileDriver'
import { DebugDriver } from './DebugDriver'
import { ConsoleDriver } from './ConsoleDriver'

export const Drivers = {
  file: FileDriver,
  debug: DebugDriver,
  console: ConsoleDriver,
}
