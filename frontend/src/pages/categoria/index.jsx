import { getAllPosts } from '../../services/wordpress'
import CategoryTemplate from '../../templates/Category'

export default function CategoryHome(data) {
  if (data.posts) {
    return <CategoryTemplate {...data} />
  } else {
    return null
  }
}

export async function getStaticProps() {
  const seo = {
    title: `Posts by categories`,
    description: `Listagem de todos os posts por categorias`
  }

  const type = 'category'
  const posts = await getAllPosts({ type, first: 20, after: null })

  return {
    revalidate: 1200,
    props: {
      seo,
      page: posts.pageInfo,
      posts: posts.nodes
    }
  }
}
