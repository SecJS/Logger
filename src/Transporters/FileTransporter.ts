import { Color } from '../utils/Color'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { TransporterContract } from '../Contracts/TransporterContract'

export interface FileTransporterOptions {
  path: string
  fileName: string
}

export class FileTransporter implements TransporterContract {
  private readonly presets: FileTransporterOptions

  constructor(path = `${process.cwd()}/storage/logs`, fileName = 'secjs.log') {
    this.presets = { path, fileName }
  }

  resolvePreset(options?: FileTransporterOptions) {
    return {
      ...this.presets,
      ...options,
    }
  }

  transport(log: string, options?: FileTransporterOptions): void {
    const presets = this.resolvePreset(options)

    const path = `${presets.path}/${presets.fileName}`

    if (!existsSync(presets.path)) mkdirSync(presets.path, { recursive: true })

    const stream = createWriteStream(path, { flags: 'a' })

    stream.write(`${Color.removeColors(log)}` + '\n')

    stream.on('error', err => {
      throw err
    })

    stream.end()
  }
}
