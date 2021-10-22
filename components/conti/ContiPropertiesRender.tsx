import { core } from 'core'
import { observer } from 'mobx-react'
import { Switch, NumericInput } from '@blueprintjs/core'
import type { ContiComponentPropSelectValue } from './interface'

declare const window: any

const ContiPropertiesRender = () => {
  const { Conti } = core.store

  if (!Conti.selectedComponent) return <>No components selected ✨</>
  if (!Conti.componentPropTypes[Conti.selectedComponent])
    return <>Property does not exist ✨</>

  return (
    <>
      {Object.keys(Conti.componentPropTypes[Conti.selectedComponent]).map(
        (componentPropName, index) => {
          const componentPropType =
            Conti.componentPropTypes[Conti.selectedComponent!][
              componentPropName
            ]

          const value =
            Conti.componentProps[Conti.selectedComponent!][componentPropName]

          const update = (value) => {
            Conti.componentProps[Conti.selectedComponent!][componentPropName] =
              value

            const item = window.frontbook.demo?.filter((item) => {
              return item.name === Conti.selectedComponent
            })[0]

            void (window as any).frontbook.update(
              `${Conti.selectedComponent}-local`,
              (component) => {
                const changedProps = item.renderProps
                  ? item.renderProps(Conti.componentProps[item.name!])
                  : {}

                for (const changedPropsName in changedProps) {
                  if (
                    changedProps[changedPropsName] !==
                    component[changedPropsName]
                  )
                    component[changedPropsName] = changedProps[changedPropsName]
                }
              }
            )
          }

          if (componentPropType.type === 'string')
            return (
              <label className="bp3-label w-full" key={index}>
                {componentPropName}
                <div className="w-full px-2">
                  <input
                    className="bp3-input w-full"
                    type="text"
                    placeholder="Text input"
                    dir="auto"
                    value={value as string}
                    onChange={(e) => update(e.target.value)}
                    style={{
                      fontSize: '0.563rem',
                      backgroundColor: 'white'
                    }}
                  />
                </div>
              </label>
            )

          if (componentPropType.type === 'boolean')
            return (
              <Switch
                className="w-full"
                label={componentPropName}
                alignIndicator="right"
                checked={value as boolean}
                onChange={(e) => update((e.target as HTMLInputElement).checked)}
                key={index}
              />
            )

          if (componentPropType.type === 'number')
            return (
              <label className="bp3-label w-full" key={index}>
                {componentPropName}
                <div className="w-full px-2">
                  <NumericInput
                    type="text"
                    placeholder="Text input"
                    dir="auto"
                    value={value as string}
                    onValueChange={(value) => update(value)}
                    style={{
                      fontSize: '0.563rem',
                      backgroundColor: 'white'
                    }}
                  />
                </div>
              </label>
            )
          if (componentPropType.type === 'select')
            return (
              <label className="bp3-label w-full" key={index}>
                {componentPropName}
                <div className="bp3-html-select">
                  <select
                    value={value as string}
                    onChange={(e) =>
                      update((e.target as HTMLSelectElement).value)
                    }
                  >
                    {(
                      componentPropType.defaultValue as ContiComponentPropSelectValue
                    ).selectableValues.map((value) => {
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    })}
                  </select>
                  <span className="bp3-icon bp3-icon-double-caret-vertical" />
                </div>
              </label>
            )
          return <></>
        }
      )}
    </>
  )
}

export default observer(ContiPropertiesRender)
