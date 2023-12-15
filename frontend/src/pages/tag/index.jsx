import { getAllTagedPosts } from '../../services/wordpress'
import TagTemplate from '../../templates/Tag'

export default function TagsHome(data) {
  if (data) {
    return <TagTemplate {...data} />
  } else {
    return null
  }
}

export async function getStaticProps() {
  const seo = {
    title: `Posts by tags`,
    description: `Listagem de todos os por tags`
  }

  const posts = await getAllTagedPosts({ first: 20, after: null })

  return {
    revalidate: 1200,
    props: {
      seo,
      page: posts.pageInfo,
      posts: posts.nodes
    }
  }
}
