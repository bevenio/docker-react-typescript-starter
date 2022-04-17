export type Theme = 'light' | 'dark'
export type LetterSize = 'small' | 'medium' | 'big'

export interface Payload {
  lang?: string
  theme?: Theme
  lettersize?: LetterSize
  animations?: boolean
}

export interface State {
  title: string
  animations: boolean
  lang: string
  lettersize: LetterSize
  theme: Theme
}
