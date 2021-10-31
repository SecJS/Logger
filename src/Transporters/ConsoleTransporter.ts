import { TransporterContract } from '../Contracts/TransporterContract'

export interface ConsoleTransporterOptions {
  streamType: 'stdout' | 'stderr'
}

export class ConsoleTransporter implements TransporterContract {
  private readonly presets: ConsoleTransporterOptions

  constructor(streamType: 'stdout' | 'stderr' = 'stdout') {
    this.presets = { streamType }
  }

  resolvePreset(options?: ConsoleTransporterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  transport(log: string, options?: ConsoleTransporterOptions): void {
    const presets = this.resolvePreset(options)

    process[presets.streamType].write(`${log}\n`)
  }
}
