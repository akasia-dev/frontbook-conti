import { observer } from 'mobx-react'
import { useState } from 'react'

declare const window: Window & Record<string, any>

const ContiPageOptions = () => {
  // const { Conti } = core.store
  const [hide, setHide] = useState(false)

  return (
    <div className="bp3-dialog w-full -mb-3">
      <div className="bp3-dialog-header flex justify-between">
        {/* Component Icon */}
        <span className="bp3-icon-large bp3-icon-helper-management" />

        {/* Component Name */}
        <h4 className="text-xs text-gray-400 font-bold overflow-ellipsis whitespace-normal">
          {typeof window !== 'undefined'
            ? window?.frontbook?.scriptName ?? 'Component Pack'
            : 'Component Pack'}
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
            <button
              type="button"
              className="w-full bp3-button bp3-icon-cloud-download"
              onClick={() => {
                const url = `/component.js`
                const a = document.createElement('a')
                a.href = url
                a.download = url.split('/').pop()!
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
              }}
            >
              <span className="text-xs">Download Vanilla Script</span>
            </button>
            {typeof window !== 'undefined' &&
              window.frontbook?.docs &&
              Object.keys(window.frontbook.docs).map((docName, index) => {
                return (
                  <button
                    type="button"
                    className="w-full bp3-button bp3-icon-link mt-2"
                    key={index}
                    onClick={() => {
                      const a = document.createElement('a')
                      a.href = window.frontbook.docs[docName]
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                    }}
                  >
                    <span className="text-xs">{docName}</span>
                  </button>
                )
              })}
          </>
        )}
      </div>
    </div>
  )
}

export default observer(ContiPageOptions)
