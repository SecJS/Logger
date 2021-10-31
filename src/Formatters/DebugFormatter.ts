import { Chalk } from 'chalk'
import { Color } from '../utils/Color'
import { getTimestamp } from '../utils/getTimestamp'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface DebugFormatterOptions {
  color: Chalk
  context: string
}

export class DebugFormatter implements FormatterContract {
  private readonly presets: DebugFormatterOptions

  constructor(context = DebugFormatter.name, color = Color.white) {
    this.presets = { color, context }
  }

  resolvePreset(options?: DebugFormatterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  format(message: string, options?: DebugFormatterOptions): string {
    const presets = this.resolvePreset(options)

    const pid = Color.purple(`[SecJS Debugger] - PID: ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const messageCtx = Color.yellow(`[${presets.context}] `)
    const timestampDiff = DebugFormatter.getTimestampDiff()

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
