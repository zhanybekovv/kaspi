export type Props = {
  readonly element: Element;
}

export type Element = {
  readonly subdivisions?: Subdivision[]
  readonly name: string;
  readonly id: string
}

export type Subdivision = {
  readonly id: string,
  readonly name: string
}