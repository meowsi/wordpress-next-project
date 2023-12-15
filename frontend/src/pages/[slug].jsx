import { getPost } from '../services/wordpress'
import PostTemplate from '../templates/Post'

export default function Post(data) {
  if (data.post) {
    return <PostTemplate {...data} />
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
  const post = await getPost(slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  const seo = {
    title: post.title,
    description: post.excerpt.replace(/<[^>]*>?/gm, '')
  }

  return {
    revalidate: 1200,
    props: {
      seo,
      post: post
    }
  }
}
