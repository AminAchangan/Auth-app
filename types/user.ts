export interface User {
  readonly name?: {
    readonly title?: string
    readonly first: string
    readonly last: string
  }
  readonly email?: string
  readonly location?: {
    readonly city?: string
    readonly state?: string
  }
  readonly picture?: {
    readonly large?: string
    readonly medium?: string
    readonly thumbnail?: string
  }
  readonly gender?: 'male' | 'female'
  readonly phone?: string
  readonly cell?: string
  readonly dob?: {
    readonly date?: string | Date
    readonly age?: number
  }
  readonly nat?: string
}

export interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}
