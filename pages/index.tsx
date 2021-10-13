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
        <title>컴포넌트 콘티 페이지</title>
      </Head>
      <div className="developmentPage">
        <ContiLayout
          {...{
            components,
            positions,
            projectDescription: {
              title: '🧤  컴포넌트 콘티 페이지',
              subtitle:
                '여기서 컴포넌트 목록을 확인한 후 필요한 컴포넌트 코드를 생성해서 복사하실 수 있습니다.'
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
