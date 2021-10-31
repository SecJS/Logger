import { Color } from '../utils/Color'
import { DebugMapper } from './DebugMapper'
import { DebugFormatter } from '../Formatters/DebugFormatter'
import { DebugTransporter } from '../Transporters/DebugTransporter'

export class Debugger {
  private readonly context: string
  private readonly namespace: string
  private readonly mapper: DebugMapper

  constructor(
    context = Debugger.name,
    namespace = 'api:main',
    mapper?: DebugMapper,
  ) {
    this.context = context
    this.namespace = namespace
    this.mapper =
      mapper ||
      new DebugMapper([new DebugFormatter(context)], [new DebugTransporter()])
  }

  info(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'INFO'
    formatterOpts.color = Color.info
    formatterOpts.context = formatterOpts.context || this.context

    transporterOpts.streamType = 'stdout'
    transporterOpts.namespace = transporterOpts.namespace || this.namespace

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  debug(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'DEBUG'
    formatterOpts.color = Color.debug
    formatterOpts.context = formatterOpts.context || this.context

    transporterOpts.streamType = 'stdout'
    transporterOpts.namespace = transporterOpts.namespace || this.namespace

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  warn(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'WARN'
    formatterOpts.color = Color.warning
    formatterOpts.context = formatterOpts.context || this.context

    transporterOpts.streamType = 'stdout'
    transporterOpts.namespace = transporterOpts.namespace || this.namespace

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  error(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'ERROR'
    formatterOpts.color = Color.error
    formatterOpts.context = formatterOpts.context || this.context

    transporterOpts.streamType = 'stderr'
    transporterOpts.namespace = transporterOpts.namespace || this.namespace

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }

  success(message: any, formatterOpts: any = {}, transporterOpts: any = {}) {
    formatterOpts.level = 'SUCCESS'
    formatterOpts.color = Color.log
    formatterOpts.context = formatterOpts.context || this.context

    transporterOpts.streamType = 'stdout'
    transporterOpts.namespace = transporterOpts.namespace || this.namespace

    this.mapper.resolve(message, formatterOpts, transporterOpts)
  }
}
