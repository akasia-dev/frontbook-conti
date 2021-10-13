const nextSeoConfig = {
  title: 'frontbook-conti',
  titleTemplate: '%s',
  description: '',
  openGraph: {
    url: process.env.webUrl,
    type: 'website',
    images: [
      {
        url: `${process.env.webUrl}/meta/meta-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'welcome!'
      }
    ]
  }
}

export default nextSeoConfig
