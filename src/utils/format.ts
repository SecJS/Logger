import { Formatters } from '../Formatters/Formatters'
import { NotImplementedException } from '@secjs/exceptions'

export function format(formatter: string, message: any, options?: any): string {
  const Formatter = Formatters[formatter]

  if (!Formatter) {
    throw new NotImplementedException(`Formatter ${formatter} not found`)
  }

  return new Formatter().format(message, options)
}
