import { Chalk } from 'chalk'
import { Color } from '../Utils/Color'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface JsonFormatterOptions {
  color: Chalk
}

export class JsonFormatter implements FormatterContract {
  format(
    message: Record<any, unknown>,
    options?: JsonFormatterOptions,
  ): string {
    options = Object.assign({}, { color: Color.green }, options)

    const pid = Color.yellow(`[SecJS] - PID: ${process.pid}`)

    return `${pid} - ${Color.bold('JSON:')} ${options.color(
      JSON.stringify(message),
    )}`
  }
}
