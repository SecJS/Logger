import chalk, { Chalk } from 'chalk'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class Color {
  static chalk = chalk

  static get bold(): Chalk {
    return Color.chalk.bold
  }

  static get purple(): Chalk {
    return Color.chalk.hex('#7059C1')
  }

  static get yellow(): Chalk {
    return Color.chalk.hex('#ffe600')
  }

  static get cyan(): Chalk {
    return Color.chalk.hex('#00ffff')
  }

  static get white(): Chalk {
    return Color.chalk.hex('#ffffff')
  }

  static get orange(): Chalk {
    return Color.chalk.hex('#f18b0e')
  }

  static get green(): Chalk {
    return Color.chalk.hex('#0ef12c')
  }

  static get darkGreen(): Chalk {
    return Color.chalk.hex('#1cb70b')
  }

  static get red(): Chalk {
    return Color.chalk.hex('#f10e0e')
  }

  static removeColors(string: string): any {
    return Color.chalk.reset(string).replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      '',
    )
  }

  static get info(): any {
    return this.cyan.bold
  }

  static get log(): any {
    return this.green.bold
  }

  static get debug(): any {
    return this.purple.bold
  }

  static get error(): any {
    return this.red.bold
  }

  static get warning(): any {
    return this.orange.bold
  }

  static httpMethod(method: Methods): any {
    return this[method] as Chalk
  }

  static get GET(): any {
    return this.purple.bold('GET 🔍')
  }

  static get PUT(): any {
    return this.yellow.bold('PUT 🛠')
  }

  static get POST(): any {
    return this.green.bold('POST 🧱')
  }

  static get DELETE(): any {
    return this.red.bold('DELETE ❌')
  }
}
