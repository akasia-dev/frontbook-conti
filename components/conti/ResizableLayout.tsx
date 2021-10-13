import React from 'react'
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

  const [layout] = useState(
    props.items.map((item, i) => {
      if (!item) return
      return {
        x: item.x ?? 0,
        y: item.y ?? 0,
        w: item.w ?? 5,
        h: item.h ?? 5,
        i: i.toString()
      }
    })
  )

  return (
    <>
      <ReactGridLayout layout={layout} {...props}>
        {props.items.map((item, i) => {
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
                  {/* TODO */}
                  {false && (
                    <button
                      aria-label="Component Code"
                      className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-code"
                      onClick={() => {
                        clipboardCopy(
                          // TODO
                          // item.code!(
                          //   Conti.componentProps[item.name!],
                          //   Conti.componentPropTypes[item.name!]
                          // )
                          ''
                        )

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
                  )}
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center p-4 pb-0 overflow-scroll">
                {item.renderProps
                  ? item.component!(
                      item.renderProps(Conti.componentProps[item.name!])
                    )
                  : item.component!()}
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
