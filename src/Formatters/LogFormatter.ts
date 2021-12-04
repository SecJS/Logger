import { Chalk } from 'chalk'
import { Color } from '../utils/Color'
import { getTimestamp } from '../utils/getTimestamp'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface LogFormatterOptions {
  color: Chalk
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'SUCCESS'
}

export class LogFormatter implements FormatterContract {
  format(message: string, options?: LogFormatterOptions): string {
    options = Object.assign({}, { color: Color.green, level: 'info' }, options)

    const pid = Color.yellow(`[SecJS] - PID: ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const level = LogFormatter.paintByLevel(options.level)

    return `${pid} - ${timestamp} ${level} ${options.color(message)}`
  }

  private static paintByLevel(level: string) {
    const levelColors = {
      info: Color.info,
      debug: Color.debug,
      warn: Color.warning,
      error: Color.error,
      success: Color.log,
    }

    return levelColors[level.toLowerCase()](`[${level}]`)
  }
}
