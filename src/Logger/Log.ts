import { Color } from '../utils/color'
import { getTimestamp } from '../utils/getTimestamp'

export function Log(message: any, context?: string): void {
  let output = Color.green(message)

  if (typeof message === 'object') {
    output = `${Color.log('Object:')} ${Color.green(
      JSON.stringify(message, null, 2),
    )}\n`
  }

  const timestamp = Color.white(getTimestamp())
  const pid = Color.green(`[SecJS] ${process.pid}`)
  const messageCtx = context ? Color.yellow(`[${context}] `) : ''

  process.stdout.write(`${pid} - ${timestamp} ${messageCtx}${output}\n`)
}
