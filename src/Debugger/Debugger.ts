import debug from 'debug'

import { Color } from '../utils/color'
import { Chalk } from 'chalk'
import { getTimestamp } from '../utils/getTimestamp'

export class Debugger {
  private readonly d: debug.Debugger

  constructor(namespace: string) {
    this.d = debug.debug(namespace)
  }

  error(message: any, context?: string): void {
    this.printMessage(message, Color.red, context)
  }

  debug(message: any, context?: string): void {
    this.printMessage(message, Color.purple, context)
  }

  warn(message: any, context?: string): void {
    this.printMessage(message, Color.orange, context)
  }

  printMessage(message: any, color: Chalk, context?: string): void {
    let output = color(message)

    if (typeof message === 'object') {
      output = `${color.bold('Object:')} ${color(
        JSON.stringify(message, null, 2),
      )}\n`
    }

    const pid = color(`[SecJS Debugger] ${process.pid}`)
    const messageCtx = context ? Color.yellow(`[${context}] `) : ''
    const timestamp = Color.white(getTimestamp())

    this.d(`${pid} - ${timestamp} ${messageCtx}${output}\n`)
  }
}
