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
  for (const { controls, name } of Object.values(components)) {
    if (controls) {
      componentPropTypes[name!] = controls
      componentProps[name!] = {}

      for (const propName of Object.keys(controls)) {
        const defaultValue = controls[propName].defaultValue
        if (
          controls[propName].type === 'select' &&
          typeof defaultValue === 'object'
        ) {
          componentProps[name!][propName] = defaultValue.defaultValue as string
          continue
        }

        componentProps[name!][propName] = controls[propName].defaultValue as
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
