import type { ServicePageContext } from 'interfaces/service'
import ContiLayout from 'components/conti/ContiLayout'
import { packComponent } from 'components/conti/utils'
import { components, positions } from 'stores/conti/components'
import style from './index.scss'
import Head from 'next/head'

const ContiPage = () => {
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
  const packedData = packComponent(components)
  if (packedData) {
    const { componentPropTypes, componentProps } = packedData
    context.store.Conti.componentPropTypes = componentPropTypes
    context.store.Conti.componentProps = componentProps
  }

  return { query: context.query }
}

export default ContiPage
