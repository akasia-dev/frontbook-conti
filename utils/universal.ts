import { NextPageContext } from 'next'
import router from 'next/router'

export const redirect = (location: string, context?: NextPageContext) => {
  try {
    if (context?.res && context.res.writeHead) {
      context.res.writeHead(302, {
        Location: location
      })

      context.res.end()
    } else {
      router.replace('/')
    }
  } catch (e) {}
}
