import { Color } from '../utils/Color'
import { LogMapper } from './LogMapper'
import { ContextFormatter } from '../Formatters/ContextFormatter'
import { FileTransporter } from '../Transporters/FileTransporter'
import { ConsoleTransporter } from '../Transporters/ConsoleTransporter'

export class Logger {
  private readonly context: string
  private readonly mapper: LogMapper

  constructor(context = Logger.name, mapper?: LogMapper) {
    this.context = context
    this.mapper =
      mapper ||
      new LogMapper(
        [new ContextFormatter(context)],
        [new ConsoleTransporter(), new FileTransporter()],
      )
  }

  info(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'INFO'
    formatterOpts.color = Color.info
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.removeTransporter(FileTransporter)
    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  debug(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'DEBUG'
    formatterOpts.color = Color.debug
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  warn(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'WARN'
    formatterOpts.color = Color.warning
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  error(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'ERROR'
    formatterOpts.color = Color.error
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stderr'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  success(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'SUCCESS'
    formatterOpts.color = Color.log
    formatterOpts.context = formatterOpts.context || this.context
    transporterOpts.streamType = 'stdout'

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }
}

new Logger().info('Hello')
