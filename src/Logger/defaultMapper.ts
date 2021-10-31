import { LogMapper } from './LogMapper'
import { ContextFormatter } from '../Formatters/ContextFormatter'
import { ConsoleTransporter } from '../Transporters/ConsoleTransporter'

export const defaultMapper = new LogMapper(
  [new ContextFormatter()],
  [new ConsoleTransporter()],
)
