import React, { useEffect } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { useState } from 'react'
import clipboardCopy from 'clipboard-copy'

import type {
  IResizableLayoutProps,
  IExtendedContiComponent
} from './interface'
import style from './ResizableLayout.scss'
import NextLink from 'components/atomics/NextLink'
import { core } from 'core'
import { observer } from 'mobx-react'
import { Position, Toaster } from '@blueprintjs/core'

const ReactGridLayout = WidthProvider(RGL)

const ResizableLayout = (_props: IResizableLayoutProps) => {
  const { Conti } = core.store
  const props = {
    ...{
      className: 'layout',
      items: [] as IExtendedContiComponent[],
      rowHeight: 30,
      cols: 12,
      isDraggable: false,
      isResizable: false
    },
    ..._props
  }

  const [layout, setLayout] = useState(
    props.items.map((item, i) => {
      if (!item) return
      return {
        x: item.x ?? 0,
        y: item.y ?? 0,
        w: item.w ?? 6,
        h: item.h ?? 6,
        i: i.toString()
      }
    })
  )

  useEffect(() => {
    setLayout(
      props.items.map((item, i) => {
        if (!item) return
        return {
          x: item.x ?? 0,
          y: item.y ?? 0,
          w: item.w ?? 6,
          h: item.h ?? 6,
          i: i.toString()
        }
      })
    )

    props.items.map((item) => {
      if (!item.name) return
      try {
        ;(window as any).frontbook.react({
          name: `${item.name}-local`,
          props: item.renderProps
            ? item.renderProps(Conti.componentProps[item.name!])
            : {}
        })
      } catch (e) {}
    })
  }, [props.items])

  return (
    <>
      <ReactGridLayout layout={layout} {...props}>
        {props.items.map((item, i) => {
          let renderedComponent = <></>
          try {
            renderedComponent = React.createElement(
              `${item.name}-local`,
              undefined,
              item.children
            )
          } catch (e) {}

          const isPropExist =
            Object.keys(Conti.componentProps[item.name!]).length > 0

          return (
            <div className="bp3-dialog" key={i}>
              <div className="bp3-dialog-header flex justify-between pl-2">
                {/* Component Icon */}
                {/* <span className="bp3-icon-large bp3-icon-tag" /> */}

                {/* Component Name */}
                <h4 className="text-xs text-gray-400 font-bold overflow-ellipsis whitespace-normal">
                  {item.name}
                </h4>

                {/* Component Prop */}
                <div>
                  {/* Document */}
                  {item.documentUrl && (
                    <NextLink href={item.documentUrl} target="_blank">
                      <button
                        aria-label="Component Documents"
                        className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-document-open"
                      />
                    </NextLink>
                  )}

                  {/* Properties */}
                  {item.controls && (
                    <button
                      aria-label="Component Properties"
                      className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-properties"
                      onClick={() => (Conti.selectedComponent = item.name!)}
                    />
                  )}

                  {/* Code */}
                  <button
                    aria-label="React Code"
                    className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-code-block"
                    onClick={() => {
                      const props = (item as any).renderProps(
                        Conti.componentProps[item.name!]
                      )
                      const plainTextProps: Record<string, string> = {}

                      const pascalName = item
                        .name!.split('/')
                        .map((snake) =>
                          snake
                            .split('-')
                            .map(
                              (substr) =>
                                substr.charAt(0).toUpperCase() + substr.slice(1)
                            )
                            .join('')
                        )
                        .join('/')

                      Object.entries(props).map(([key, value]: any) => {
                        if (typeof value === 'object' || Array.isArray(value)) {
                          plainTextProps[key] = `{${JSON.stringify(value)}}`
                          return
                        }
                        if (typeof value === 'string') {
                          plainTextProps[key] = `"${value}"`
                          return
                        }
                        plainTextProps[key] = `{${value.toString()}}`
                      })

                      const propString = isPropExist
                        ? '\n  ' +
                          Object.entries(plainTextProps)
                            .map(([key, value]) => `${key}=${value}`)
                            .join('\n  ') +
                          '\n'
                        : ''

                      const endTag =
                        item.children !== undefined
                          ? `>${item.children}<${pascalName}>`
                          : `${propString.length === 0 ? ' ' : ''}/>`

                      const pureCode = `<${pascalName}${propString}${endTag}`
                      clipboardCopy(pureCode)

                      const AppToaster = Toaster.create({
                        className: 'recipe-toaster',
                        position: Position.TOP
                      })

                      AppToaster.show({
                        message: 'Code Copied ✨',
                        intent: 'success',
                        timeout: 700,
                        icon: 'confirm'
                      })
                    }}
                  />

                  <button
                    aria-label="Component Code"
                    className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-code"
                    onClick={() => {
                      const props = (item as any).renderProps(
                        Conti.componentProps[item.name!]
                      )
                      const plainTextProps: Record<string, string> = {}
                      Object.entries(props).map(([key, value]: any) => {
                        if (typeof value === 'object' || Array.isArray(value)) {
                          plainTextProps[key] = JSON.stringify(value)
                          return
                        }
                        if (typeof value === 'string') {
                          plainTextProps[key] = `"${value}"`
                          return
                        }
                        plainTextProps[key] = value.toString()
                      })
                      const propString = isPropExist
                        ? '\n        ' +
                          Object.entries(plainTextProps)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(',\n        ') +
                          '\n      },'
                        : '},'
                      const pureCode = `<script>
  frontbook
    .react({
      name: "${item.name}-local",
      props: {${propString}
      useEffect: function (component) {
        // TODO: Apply side effect
      }
    })

  // TODO: Update component in outside
  frontbook
    .update(
      '${item.name}-local',
      function (element) {
        // TODO: Apply side effect
      }
    )
</script>

<${item.name}-local>${item.children !== undefined ? item.children : ''}</${
                        item.name
                      }-local>`

                      clipboardCopy(pureCode)

                      const AppToaster = Toaster.create({
                        className: 'recipe-toaster',
                        position: Position.TOP
                      })

                      AppToaster.show({
                        message: 'Code Copied ✨',
                        intent: 'success',
                        timeout: 700,
                        icon: 'confirm'
                      })
                    }}
                  />
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center p-4 pb-0 overflow-scroll">
                {renderedComponent}
              </div>
            </div>
          )
        })}
      </ReactGridLayout>

      <style jsx>{style}</style>
    </>
  )
}

export default observer(ResizableLayout)
