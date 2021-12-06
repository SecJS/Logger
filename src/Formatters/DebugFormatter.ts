import { Chalk } from 'chalk'
import { Color } from '../utils/Color'
import { getTimestamp } from '../utils/getTimestamp'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface DebugFormatterOptions {
  color: Chalk
  context: string
  namespace: string
}

export class DebugFormatter implements FormatterContract {
  format(message: string, options?: DebugFormatterOptions): string {
    options = Object.assign(
      {},
      { color: Color.green, context: 'Debugger', namespace: 'api:main' },
      options,
    )

    const pid = Color.purple(`[SecJS Debugger] - PID: ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const messageCtx = Color.yellow(`[${options.context}] `)
    const timestampDiff = DebugFormatter.getTimestampDiff()

    return `${pid} - ${timestamp} ${messageCtx}${options.color(
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
