import { getMenus, getAllCategories, getAllTags } from '../services/wordpress'
import HomeTemplate from '../templates/Home'

export default function Home(data) {
  return <HomeTemplate {...data} />
}

export async function getStaticProps() {
  const menus = await getMenus()
  const categories = await getAllCategories({ first: 50, after: null })
  const tags = await getAllTags({ first: 50, after: null })

  const seo = {
    title: 'Home',
    description: 'Página inicial'
  }

  return {
    revalidate: 1200,
    props: {
      seo,
      header: menus.header,
      footer: menus.footer,
      tags: tags.nodes,
      categories: categories.nodes
    }
  }
}
