import { getAllPosts, getCategory } from '../../services/wordpress'
import CategoryTemplate from '../../templates/Category'

export default function Category(data) {
  if (data) {
    return <CategoryTemplate {...data} />
  } else {
    return null
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const category = await getCategory(slug)

  if (!category) {
    return {
      notFound: true
    }
  }

  const type = 'category'
  const posts = await getAllPosts({ type, slug, first: 20, after: null })

  const seo = {
    title: `Categoria ${slug}`,
    description: `Listagem de posts da categoria ${slug}`
  }

  return {
    revalidate: 1200,
    props: {
      seo,
      page: posts.pageInfo,
      posts: posts.nodes
    }
  }
}
