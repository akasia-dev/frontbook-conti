import type {
  IContiComponent,
  IContiStoreComponentProps,
  IContiStoreComponentPropTypes,
  IContiStoreComponentType,
  IContiStoreComponentValue
} from './interface'

export const packComponent = (components: IContiComponent[]) => {
  const componentPropTypes: IContiStoreComponentPropTypes = {}
  const componentProps: IContiStoreComponentProps = {}

  if (!components) return
  for (const { props, title } of Object.values(components)) {
    if (props) {
      componentPropTypes[title] = props
      componentProps[title] = {}

      for (const propName of Object.keys(props)) {
        const defaultValue = props[propName].defaultValue
        if (
          props[propName].type === 'select' &&
          typeof defaultValue === 'object'
        ) {
          componentProps[title][propName] = defaultValue.defaultValue as string
          continue
        }

        componentProps[title][propName] = props[propName].defaultValue as
          | string
          | number
      }
    }
  }

  return { componentPropTypes, componentProps }
}

export const htmlPropMaker = (
  props: IContiStoreComponentValue,
  propTypes?: IContiStoreComponentType,
  option?: {
    isJSX: boolean
  }
) => {
  return Object.keys(props)
    .map((propName) => {
      let value = `"${props[propName]}"`

      const typeInfo = propTypes ? propTypes[propName] : undefined

      if (!option || (option && option.isJSX))
        if (typeInfo && ['number', 'boolean'].includes(typeInfo.type))
          value = `{${props[propName]}}`

      return `${propName}=${value}`
    })
    .join(' ')
}
