import { Switch } from '@blueprintjs/core'
import { core } from 'core'
import clipboardCopy from 'clipboard-copy'
import { observer } from 'mobx-react'
import { useState } from 'react'

const ContiPageOptions = () => {
  const { Conti } = core.store
  const [hide, setHide] = useState(false)

  return (
    <div className="bp3-dialog w-full -mb-3">
      <div className="bp3-dialog-header flex justify-between">
        {/* Component Icon */}
        <span className="bp3-icon-large bp3-icon-helper-management" />

        {/* Component Name */}
        <h4 className="text-xs text-gray-400 font-bold overflow-ellipsis whitespace-normal">
          Page Option
        </h4>

        {/* Component Prop */}
        <button
          aria-label="Component Code"
          className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-collapse-all"
          onClick={() => setHide(!hide)}
        />
      </div>
      <div className="w-full h-full flex justify-center items-center px-3 mt-4 flex-col">
        {!hide && (
          <>
            <Switch
              className="w-full"
              label="isEditMode"
              alignIndicator="right"
              checked={Conti.isEditMode}
              onChange={(e) => {
                Conti.isEditMode = (e.target as HTMLInputElement).checked
              }}
            />
            {Conti.isEditMode && (
              <button
                type="button"
                className="w-full bp3-button bp3-icon-duplicate .modifier"
                onClick={() => clipboardCopy(Conti.plainLayout)}
              >
                <span className="text-xs">Copy Position JSON</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default observer(ContiPageOptions)
