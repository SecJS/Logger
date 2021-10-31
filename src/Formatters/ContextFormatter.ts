import { Chalk } from 'chalk'
import { Color } from '../utils/Color'
import { getTimestamp } from '../utils/getTimestamp'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface ContextFormatterOptions {
  color: Chalk
  context: string
}

export class ContextFormatter implements FormatterContract {
  private readonly presets: ContextFormatterOptions

  constructor(context = ContextFormatter.name, color = Color.green) {
    this.presets = { color, context }
  }

  resolvePreset(options?: ContextFormatterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  format(message: string, options?: ContextFormatterOptions): string {
    const presets = this.resolvePreset(options)

    const pid = Color.yellow(`[SecJS] - PID: ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const messageCtx = Color.yellow(`[${presets.context}] `)
    const timestampDiff = ContextFormatter.getTimestampDiff()

    return `${pid} - ${timestamp} ${messageCtx}${presets.color(
      message,
    )}${timestampDiff}`
  }

  private static lastTimestamp?: number

  private static getTimestampDiff() {
    let result = ''

    if (this.lastTimestamp) {
      result = Color.yellow(` +${Date.now() - this.lastTimestamp}ms`)
    }

    this.lastTimestamp = Date.now()

    return result
  }
}
