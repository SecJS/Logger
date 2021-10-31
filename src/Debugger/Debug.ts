import { DebugMapper } from './DebugMapper'
import { DebugFormatter } from '../Formatters/DebugFormatter'
import { DebugTransporter } from '../Transporters/DebugTransporter'

let mapper = new DebugMapper(
  [new DebugFormatter('Debug')],
  [new DebugTransporter()],
)

export function Debug(
  message: any,
  formatterOpts?: any,
  transporterOpts?: any,
): void {
  mapper.resolve(message, formatterOpts, transporterOpts)
}

export function changeDebugFnMapper(m: DebugMapper) {
  mapper = m
}
