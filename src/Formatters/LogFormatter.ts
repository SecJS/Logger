import { Chalk } from 'chalk'
import { Color } from '../utils/Color'
import { getTimestamp } from '../utils/getTimestamp'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface LogFormatterOptions {
  color: Chalk
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'SUCCESS'
}

export class LogFormatter implements FormatterContract {
  private readonly presets: LogFormatterOptions

  constructor(
    color = Color.info,
    level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'SUCCESS' = 'INFO',
  ) {
    this.presets = { color, level }
  }

  resolvePreset(options?: LogFormatterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  format(message: string, options?: LogFormatterOptions): string {
    const presets = this.resolvePreset(options)

    const pid = Color.yellow(`[SecJS] - PID: ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const level = LogFormatter.paintByLevel(presets.level)

    return `${pid} - ${timestamp} ${level} ${presets.color(message)}`
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
