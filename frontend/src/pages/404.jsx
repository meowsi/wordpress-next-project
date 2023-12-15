import ErrorTemplate from '../templates/Error'

export default function ErrorPage(props) {
  return <ErrorTemplate {...props} />
}

export async function getStaticProps() {
  const data = []

  const seo = {
    title: '404',
    description: 'Página não encontrada.',
    noindex: true
  }

  return {
    revalidate: 1200,
    props: {
      seo,
      props: data
    }
  }
}
