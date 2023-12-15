import FormTemplate from '../templates/Form'

export default function Home(data) {
  return <FormTemplate {...data} />
}

export async function getStaticProps() {
  const seo = {
    title: 'Form',
    description: 'Formulário em React'
  }

  return {
    revalidate: 1200,
    props: {
      seo
    }
  }
}
