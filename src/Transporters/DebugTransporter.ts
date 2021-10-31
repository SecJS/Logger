import { debug } from 'debug'
import { TransporterContract } from '../Contracts/TransporterContract'

export interface DebugTransporterOptions {
  namespace: string
}

export class DebugTransporter implements TransporterContract {
  private readonly presets: DebugTransporterOptions

  constructor(namespace = 'api:main') {
    this.presets = { namespace }
  }

  resolvePreset(options?: DebugTransporterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  transport(log: string, options?: DebugTransporterOptions): void {
    const presets = this.resolvePreset(options)

    debug(presets.namespace)(log)
  }
}
