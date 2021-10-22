export interface IContiComponent {
  name?: string
  component?: (...props) => JSX.Element
  controls?: {
    [propName: string]: IContiComponentProps
  }
  renderProps?: (props: IContiStoreComponentValue) => Record<string, any>
  renderManualComponent?: (props: IContiStoreComponentValue) => JSX.Element
  children?: string
  documentUrl?: string
  x?: number
  y?: number
  w?: number
  h?: number
}

export interface IContiPositionData {
  x?: number
  y?: number
  w?: number
  h?: number
}

export type ContiComponentPropType = 'string' | 'number' | 'boolean' | 'select'
export type ContiComponentPropValue<T> = T extends 'string'
  ? string
  : T extends 'number'
  ? number
  : T extends 'boolean'
  ? boolean
  : T extends 'select'
  ? ContiComponentPropSelectValue
  : never
export type ContiComponentPropSelectValue = {
  selectableValues: string[]
  defaultValue: string
}

export interface IContiComponentProps<T = ContiComponentPropType> {
  type: T
  defaultValue?: ContiComponentPropValue<T>
}

export interface IExtendedContiComponent
  extends IContiComponent,
    IContiPositionData {}

export interface IContiLayoutProps {
  components: IContiComponent[]
  positions: IContiPositionData[]
  onLayoutChange?: (
    currentLayout: IResizableLayoutData[],
    allLayouts?: IResizableLayoutData[]
  ) => void
  projectDescription?: {
    title: string
    subtitle: string
  }
  width?: number
}

export interface IResizableLayoutProps {
  className?: string
  items: IExtendedContiComponent[]
  rowHeight: number
  onLayoutChange?: (
    currentLayout: IResizableLayoutData[],
    allLayouts?: IResizableLayoutData[]
  ) => void
  cols: number
  isDraggable?: boolean
  isResizable?: boolean
}

export interface IResizableLayoutData {
  x: number
  y: number
  w: number
  h: number
  i: number
  moved: boolean
  static: boolean
}

export type IContiStoreComponentValue = {
  [propName: string]: string | number | boolean
}

export type IContiStoreComponentType = {
  [propName: string]: IContiComponentProps<ContiComponentPropType>
}

export interface IContiStoreComponentProps {
  [componentName: string]: IContiStoreComponentValue
}

export interface IContiStoreComponentPropTypes {
  [componentName: string]: IContiStoreComponentType
}
