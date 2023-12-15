import { getTag, getAllPosts } from '../../services/wordpress'
import TagTemplate from '../../templates/Tag'

export default function Tag(data) {
  if (data) {
    return <TagTemplate {...data} />
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
  const tag = await getTag(slug)

  if (!tag) {
    return {
      notFound: true
    }
  }

  const type = 'tag'
  const posts = await getAllPosts({ type, slug })

  const seo = {
    title: `Tag ${slug}`,
    description: `Listagem de posts da tag ${slug}`
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
