interface ReduxAction<T> {
  readonly type: string
  readonly payload?: T
  readonly shared?: boolean
}
