import { gql } from '@apollo/client'

import { wordpressApi } from './api'

//Header
export async function getMenus() {
  try {
    const bodyHeader = `
      query GetHeaderMenu {
        menuItems(where: {location: HEADER_MENU}) {
          nodes {
            label
            uri
          }
        }
      }
    `
    const headerResponse = await wordpressApi.query({
      query: gql`
        ${bodyHeader}
      `
    })

    const bodyFooter = `
      query GetHeaderMenu {
        menuItems(where: {location: FOOTER_MENU}) {
          nodes {
            label
            uri
          }
        }
      }
    `
    const footerResponse = await wordpressApi.query({
      query: gql`
        ${bodyFooter}
      `
    })

    const headerMenu = headerResponse.data.menuItems.nodes
    const footerMenu = footerResponse.data.menuItems.nodes

    return {
      header: headerMenu.length ? headerMenu : null,
      footer: footerMenu.length ? footerMenu : null
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

// Categorias
export async function getAllCategories({ first = 10, after = null }) {
  try {
    const body = `
    query GetCategories {
      categories (first: ${first}, after: ${after}) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          databaseId
          name
          slug
        }
      }
    }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    const categories = response.data.categories

    if (categories.nodes.length) {
      return categories
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getCategory(slug = '') {
  try {
    const body = `
    query GetCategoryBySlug {
      categories(where: {slug: "${slug}"}) {
        nodes {
          slug
          uri
          databaseId
        }
      }
    }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    const category = response.data.categories.nodes

    if (category.length) {
      return category
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

//Tags
export async function getAllTags({ first = 10, after = null }) {
  try {
    const body = `
    query GetTags {
      tags (first: ${first}, after: ${after}) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          databaseId
          slug
          name
        }
      }
    }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    const tags = response.data.tags

    if (tags.nodes.length) {
      return tags
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getTag(slug = '') {
  try {
    const body = `
    query GetTagBySlug {
      tags(where: {slug: "${slug}"}) {
        nodes {
          slug
          uri
          databaseId
        }
      }
    }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    const tag = response.data.tags.nodes

    if (tag.length) {
      return tag
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

//Posts
export async function getAllPosts({
  type = '',
  slug = '',
  first = 20,
  after = null
}) {
  try {
    let filter = 'where: {categoryName: ""}'

    if (type === 'category') {
      filter = `where: {categoryName: "${slug}"}`
    } else if (type === 'tag') {
      if (slug) {
        filter = `where: {tagSlugIn: "${slug}"}`
      } else {
        filter = `where: {tag: ""}`
      }
    }

    const page = `first: ${first}, after: ${after}`

    const body = `
      query GetPots {
        posts (${page}, ${filter}) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            title
            slug
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    const posts = response.data.posts

    if (posts.nodes.length) {
      return posts
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getAllTagedPosts({ first = 10, after = null }) {
  const page = `first: ${first}, after: ${after}`

  try {
    const body = `
      query GetTagedPots {
        tags (${page}) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            posts {
              nodes {
                databaseId
                slug
                title
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    let posts = []
    response.data.tags.nodes.map((item) => {
      if (item.posts.nodes.length) {
        item.posts.nodes.map((node) => {
          const newItem = node
          posts.push(newItem)
        })
      }
    })

    posts = posts.filter(
      (v, i, a) => a.findIndex((t) => t.databaseId === v.databaseId) === i
    )

    if (posts.length) {
      return {
        pageInfo: response.data.tags.pageInfo,
        nodes: posts
      }
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getPost(slug = '') {
  try {
    const body = `
      query GetPots {
        postBy(slug: "${slug}") {
          title
          excerpt
          content
        }
      }
    `
    const response = await wordpressApi.query({
      query: gql`
        ${body}
      `
    })

    const posts = response.data.postBy

    if (posts) {
      return posts
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
