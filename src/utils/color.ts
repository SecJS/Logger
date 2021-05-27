import chalk, { Chalk } from 'chalk'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class Color {
  static get purple(): Chalk {
    return chalk.hex('#7059C1')
  }

  static get yellow(): Chalk {
    return chalk.hex('#ffe600')
  }

  static get cyan(): Chalk {
    return chalk.hex('#00ffff')
  }

  static get white(): Chalk {
    return chalk.hex('#ffffff')
  }

  static get orange(): Chalk {
    return chalk.hex('#f18b0e')
  }

  static get green(): Chalk {
    return chalk.hex('#0ef12c')
  }

  static get darkGreen(): Chalk {
    return chalk.hex('#1cb70b')
  }

  static get red(): Chalk {
    return chalk.hex('#f10e0e')
  }

  static get log(): any {
    return this.green.bold
  }

  static get debug(): any {
    return this.orange.bold
  }

  static get error(): any {
    return this.red.bold
  }

  static get warning(): any {
    return this.yellow.bold
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
