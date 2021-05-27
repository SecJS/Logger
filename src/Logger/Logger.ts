import { Chalk } from 'chalk'
import { Color } from '../utils/color'
import { getTimestamp } from '../utils/getTimestamp'

export class Logger {
  private readonly context: string

  constructor(context: string) {
    this.context = context
  }

  private static lastTimestamp?: number

  error(
    message: any,
    trace?: any,
    context?: string,
    isTimeDiffEnabled = true,
  ): void {
    Logger.printMessage(
      message,
      Color.red,
      context || this.context,
      'stderr',
      isTimeDiffEnabled,
    )
    Logger.printStackTrace(trace)
  }

  log(message: any, context?: string, isTimeDiffEnabled = true): void {
    Logger.printMessage(
      message,
      Color.green,
      context || this.context,
      'stdout',
      isTimeDiffEnabled,
    )
  }

  warn(message: any, context?: string, isTimeDiffEnabled = true): void {
    Logger.printMessage(
      message,
      Color.orange,
      context || this.context,
      'stdout',
      isTimeDiffEnabled,
    )
  }

  private static getTimestampDiff(isTimeDiffEnabled?: boolean): string {
    let result = ''

    if (Logger.lastTimestamp && isTimeDiffEnabled) {
      result = Color.yellow(` +${Date.now() - Logger.lastTimestamp}ms`)
    }

    Logger.lastTimestamp = Date.now()

    return result
  }

  private static printMessage(
    message: any,
    color: Chalk,
    context: string,
    writeStreamType: 'stderr' | 'stdout' = 'stdout',
    isTimeDiffEnabled?: boolean,
  ): void {
    let output = color(message)

    if (typeof message === 'object') {
      output = `${color.bold('Object:')} ${color(
        JSON.stringify(message, null, 2),
      )}\n`
    }

    const pid = color(`[SecJS] ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const messageCtx = Color.yellow(`[${context}] `)
    const timestampDiff = Logger.getTimestampDiff(isTimeDiffEnabled)

    process[writeStreamType].write(
      `${pid} - ${timestamp} ${messageCtx}${output}${timestampDiff}\n`,
    )
  }

  private static printStackTrace(trace: any) {
    if (!trace) {
      return
    }

    process.stderr.write(`${trace}\n`)
  }
}
