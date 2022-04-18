export type Status = 'unset' | 'trying' | 'failed' | 'succeeded'

export interface Payload {
  jwt?: string
  identifier?: string
  password?: string
}

export interface State {
  jwt: string | null
  status: Status
}
