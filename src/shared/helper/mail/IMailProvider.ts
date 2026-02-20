export interface IMailProps {
  to: string
  subject: string
  template: string
  priority?: number
}

export interface IMailProvider {
  sendMail(data: IMailProps): Promise<void>
}
