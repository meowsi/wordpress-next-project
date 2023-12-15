import { gql } from '@apollo/client'

import { wordpressApi } from './api'

// Este arquivo possui as rotas para a criação do sitemaps
// Cada rota busca todas as slugs de um tipo de conteúdo

export async function mapAllCats() {
  try {
    const body = `
    query GetCategoriesLinks {
      terms(where: {taxonomies: CATEGORY}) {
        nodes {
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

    return response.data.terms.nodes
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function mapAllTags() {
  try {
    const body = `
    query GetTagsLinks {
      terms(where: {taxonomies: TAG}) {
        nodes {
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

    return response.data.terms.nodes
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function mapAllPosts() {
  try {
    const body = `
    query GetPostsSlugs {
      posts {
        nodes {
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

    return response.data.posts.nodes
  } catch (error) {
    console.error(error)
    return []
  }
}
