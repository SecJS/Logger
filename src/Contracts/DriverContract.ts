export interface DriverContract {
  transport(message: string, options?: any): void | Promise<void>
}
