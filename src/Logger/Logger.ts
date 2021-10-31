import { Color } from '../utils/Color'
import { LogMapper } from './LogMapper'
import { defaultMapper } from './defaultMapper'

export class Logger {
  private readonly context: string
  private readonly mapper: LogMapper

  constructor(context = Logger.name, mapper?: LogMapper) {
    this.context = context
    this.mapper = mapper || defaultMapper
  }

  info(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'INFO'
    formatterOpts.color = Color.cyan
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  debug(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'DEBUG'
    formatterOpts.color = Color.purple
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  warn(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'WARN'
    formatterOpts.color = Color.orange
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  error(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'ERROR'
    formatterOpts.color = Color.red
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stderr'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  success(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'SUCCESS'
    formatterOpts.color = Color.green
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }
}
