import type { ServicePageContext } from 'interfaces/service'
import ContiLayout from 'components/conti/ContiLayout'
import { packComponent } from 'components/conti/utils'
import style from './index.scss'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { core } from 'core'

declare const window: Window & { frontbook: any }

const ContiPage = () => {
  const [components, setComponents] = useState([])
  const [positions, setPositions] = useState([])

  useEffect(() => {
    setComponents(window.frontbook?.demo ?? [])
    setPositions(window.frontbook?.positions ?? [])

    const packedData = packComponent(window.frontbook?.demo ?? [])
    if (packedData) {
      const { componentPropTypes, componentProps } = packedData
      core.store.Conti.componentPropTypes = componentPropTypes
      core.store.Conti.componentProps = componentProps
    }
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
          backgroundColor:
            typeof window !== 'undefined' && window.frontbook?.mainColor
              ? window.frontbook.mainColor
              : '#51d4b0'
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
            width: 900
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
