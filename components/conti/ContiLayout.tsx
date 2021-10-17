import type { IContiComponent, IContiLayoutProps } from './interface'
import style from './ContiLayout.scss'
import { observer } from 'mobx-react-lite'
import { core } from 'core'
import ResizableLayout from './ResizableLayout'
import ContiProperties from './ContiProperties'
import ContiPageOptions from './ContiPageOptions'
import { rectanglePack } from 'utils/ractanglePack'
import { useWindowSize } from 'utils/hooks/useWindowSize'
import { useEffect, useState } from 'react'

const ContiLayout = (props: IContiLayoutProps) => {
  const { Conti } = core.store
  const [cols, setCols] = useState(12)
  const [isShowLayout, setIsShowLayout] = useState(true)

  const componentWithPositions = rectanglePack({
    w: 12,
    h: Number.MAX_VALUE,
    nodes: props.components.map((component) => {
      if (typeof component.w === 'undefined') component.w = 6
      if (typeof component.h === 'undefined') component.h = 6

      return component
    }) as (IContiComponent & { w: number; h: number })[]
  })

  const size = useWindowSize()
  const windowWidth =
    typeof size.width !== 'undefined' ? size.width : props.width!

  const enableLayout = () => setIsShowLayout(true)
  useEffect(() => {
    if (size.width !== undefined) {
      const newCols = size.width >= 570 ? 12 : 1
      setCols(newCols)

      // If the initial cols start with 1,
      // the layout must be re-rendered to function normally.
      if (cols < newCols) {
        setIsShowLayout(false)
        setTimeout(enableLayout, 0)
      }
    }
  }, [size])

  return (
    <div
      className="contiLayout"
      style={{
        maxWidth: props.width ? `${props.width}px` : undefined
      }}
    >
      <div className="contiComponents">
        {isShowLayout && (
          <ResizableLayout
            items={componentWithPositions}
            cols={cols}
            rowHeight={30}
            isDraggable={Conti.isEditMode}
            isResizable={Conti.isEditMode}
          />
        )}
      </div>

      <div
        className="contiProperties"
        style={{
          right: props.width
            ? `calc(50% - ${
                windowWidth >= props.width ? props.width / 2 : windowWidth / 2
              }px)`
            : undefined
        }}
      >
        <ContiPageOptions />
        <ContiProperties />
      </div>

      {props.projectDescription && (
        <div
          className="fixed bottom-0 w-full h-36"
          style={{
            maxWidth: props.width ? `${props.width}px` : undefined
          }}
        >
          <div className="w-full h-full">
            <div className="bp3-card bg-opacity-80 bg-gray-50">
              <h5 className="text-base font-bold mb-1">
                {props.projectDescription.title}
              </h5>
              <p className="text-xs">{props.projectDescription.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{style}</style>
    </div>
  )
}

export default observer(ContiLayout)
