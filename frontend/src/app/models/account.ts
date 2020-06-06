export interface LoginInfo {
  username: string,
  password: string,
}

export interface AccountInfo extends LoginInfo {
  first_name: string,
  last_name: string,
}

export interface OrgRequest {
  id: number,
  org: string,
  user: Partial<User>
}

export interface User extends AccountInfo {
  id: number,
  organization?: {
    name: string,
    leader: number,
    company_type: string,
    email: string
  }
}
