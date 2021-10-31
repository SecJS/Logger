import {
  FormatterContract,
  FormatterMapperContract,
} from '../Contracts/FormatterContract'

import {
  TransporterContract,
  TransporterMapperContract,
} from '../Contracts/TransporterContract'

export class DebugMapper {
  formatters: FormatterMapperContract[] = []
  transporters: TransporterMapperContract[] = []

  constructor(
    formatters: FormatterContract[],
    transporters: TransporterContract[],
  ) {
    formatters.forEach(formatter => this.addFormatter(formatter))
    transporters.forEach(transporter => this.addTransporter(transporter))
  }

  addFormatter(formatter: FormatterContract) {
    this.formatters.push({ name: formatter.constructor.name, impl: formatter })
  }

  addTransporter(transporter: TransporterContract) {
    this.transporters.push({
      name: transporter.constructor.name,
      impl: transporter,
    })
  }

  removeFormatter(formatter: { new (): FormatterContract }) {
    this.formatters.forEach((f, i) => {
      if (f.name === formatter.name) this.transporters.splice(i, 1)
    })
  }

  removeTransporter(transporter: { new (): TransporterContract }) {
    this.transporters.forEach((t, i) => {
      if (t.name === transporter.name) this.transporters.splice(i, 1)
    })
  }

  resolve(message: any, formatterOpts?: any, transporterOpts?: any) {
    this.transporters.forEach(transporter => {
      this.formatters.forEach(formatter => {
        transporter.impl.transport(
          formatter.impl.format(message, formatterOpts),
          transporterOpts,
        )
      })
    })
  }
}
