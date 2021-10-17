import type { ServicePageContext } from 'interfaces/service'
import ContiLayout from 'components/conti/ContiLayout'
import { packComponent } from 'components/conti/utils'
import style from './index.scss'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { core } from 'core'
import { useWindowSize } from 'utils/hooks/useWindowSize'

declare const window: Window & { frontbook: any }

const ContiPage = () => {
  const [components, setComponents] = useState([])
  const [positions, setPositions] = useState([])
  const [mainColor, setMainColor] = useState('#51d4b0')
  const size = useWindowSize()

  useEffect(() => {
    setComponents(window.frontbook?.demo ?? [])
    setPositions(window.frontbook?.positions ?? [])

    const packedData = packComponent(window.frontbook?.demo ?? [])
    if (packedData) {
      const { componentPropTypes, componentProps } = packedData
      core.store.Conti.componentPropTypes = componentPropTypes
      core.store.Conti.componentProps = componentProps
    }

    if (typeof window !== 'undefined' && window.frontbook?.mainColor)
      setMainColor(window.frontbook.mainColor)
  }, [])
  return (
    <>
      <Head>
        <title>
          {typeof window !== 'undefined' && window.frontbook?.title
            ? window.frontbook.title
            : 'Component Conti Page'}
        </title>
      </Head>
      <div
        className="developmentPage"
        style={{
          backgroundColor: mainColor
        }}
      >
        <ContiLayout
          {...{
            components,
            positions,
            projectDescription: {
              title:
                typeof window !== 'undefined' && window.frontbook?.subtitle
                  ? window.frontbook.subtitle
                  : '🧤  Component Conti Page',
              subtitle:
                typeof window !== 'undefined' && window.frontbook?.description
                  ? window.frontbook.description
                  : 'After checking the component list here, you can create and copy the required component code.'
            },
            width: size.width
          }}
        />
      </div>
      <style jsx>{style}</style>
    </>
  )
}

ContiPage.getInitialProps = async (context: ServicePageContext) => {
  return { query: context.query }
}

export default ContiPage
