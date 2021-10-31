export interface TransporterContract {
  transport(logFormatted: any, options?: any)
}

export interface TransporterMapperContract {
  name: string
  impl: TransporterContract
}
