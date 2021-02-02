export type Props = {
  readonly id: string,
  readonly divisionName: string,
  readonly newEmployee?: Employee
}

export type Employee = {
  readonly id: number,
  readonly name: string,
  readonly divisionId: string
}