import { Chalk } from 'chalk'
import { Color } from '../utils/Color'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface JsonFormatterOptions {
  color: Chalk
}

export class JsonFormatter implements FormatterContract {
  private readonly presets: JsonFormatterOptions

  constructor(color = Color.white) {
    this.presets = { color }
  }

  resolvePreset(options?: JsonFormatterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  format(
    message: Record<any, unknown>,
    options?: JsonFormatterOptions,
  ): string {
    const presets = this.resolvePreset(options)

    const pid = Color.yellow(`[SecJS] - PID: ${process.pid}`)

    return `${pid} - ${Color.bold('JSON:')} ${presets.color(
      JSON.stringify(message),
    )}`
  }
}
