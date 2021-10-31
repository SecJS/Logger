export interface FormatterContract {
  format(message: any, options?: any)
}

export interface FormatterMapperContract {
  name: string
  impl: FormatterContract
}
