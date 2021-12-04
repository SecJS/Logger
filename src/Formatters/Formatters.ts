import { ContextFormatter } from './ContextFormatter'
import { DebugFormatter } from './DebugFormatter'
import { JsonFormatter } from './JsonFormatter'
import { LogFormatter } from './LogFormatter'

export const Formatters = {
  context: ContextFormatter,
  debug: DebugFormatter,
  json: JsonFormatter,
  log: LogFormatter,
}
