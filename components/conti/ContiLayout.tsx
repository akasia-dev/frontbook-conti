import type { IContiLayoutProps } from './interface'
import style from './ContiLayout.scss'
import { observer } from 'mobx-react-lite'
import { core } from 'core'
import ResizableLayout from './ResizableLayout'
import ContiProperties from './ContiProperties'
import ContiPageOptions from './ContiPageOptions'

const ContiLayout = (props: IContiLayoutProps) => {
  const { Conti } = core.store

  // * 페이지 로직
  return (
    <div
      className="contiLayout"
      style={{
        maxWidth: props.width ? `${props.width}px` : undefined
      }}
    >
      <div className="contiComponents">
        <ResizableLayout
          items={props.components.map((component, index) => {
            return { ...component, ...props.positions[index] }
          })}
          onLayoutChange={(layout) => {
            Conti.plainLayout = JSON.stringify(layout)

            if (typeof props.onLayoutChange === 'function')
              props.onLayoutChange(layout)
          }}
          cols={12}
          rowHeight={30}
          isDraggable={Conti.isEditMode}
          isResizable={Conti.isEditMode}
        />
      </div>

      <div
        className="contiProperties"
        style={{
          right: props.width ? `calc(50% - ${props.width / 2}px)` : undefined
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
