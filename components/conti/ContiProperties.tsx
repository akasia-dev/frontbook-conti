import { useState } from 'react'
import ContiPropertiesRender from './ContiPropertiesRender'

const ContiProperties = () => {
  const [hide, setHide] = useState(false)

  return (
    <div className="bp3-dialog w-full -mb-4">
      <div className="bp3-dialog-header flex justify-between">
        {/* Component Icon */}
        <span className="bp3-icon-large bp3-icon-properties" />

        {/* Component Name */}
        <h4 className="text-xs text-gray-400 font-bold overflow-ellipsis whitespace-normal">
          Component Props
        </h4>

        {/* Component Prop */}
        <button
          aria-label="Component Code"
          className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-collapse-all"
          onClick={() => setHide(!hide)}
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center px-3 mt-4">
        {!hide && <ContiPropertiesRender />}
      </div>
    </div>
  )
}

export default ContiProperties
