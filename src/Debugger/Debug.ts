import { debug } from 'debug'
import { Color } from '../utils/color'
import { getTimestamp } from '../utils/getTimestamp'

export function Debug(
  message: any,
  namespace = 'api:main',
  context?: string,
): void {
  let output = Color.purple(message)

  if (typeof message === 'object') {
    output = `${Color.purple.bold('Object:')} ${Color.purple(
      JSON.stringify(message, null, 2),
    )}\n`
  }

  const timestamp = Color.white(getTimestamp())
  const pid = Color.purple(`[SecJS Debugger] ${process.pid}`)
  const messageCtx = context ? Color.yellow(`[${context}] `) : ''

  debug(namespace)(`${pid} - ${timestamp} ${messageCtx}${output}\n`)
}
