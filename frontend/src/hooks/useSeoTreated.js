//Tratar as informações conforme a biblioteca:
//https://www.npmjs.com/package/next-seo

export const UseSeoTreated = ({ seo = null }) => {
  if (seo) {
    const title = seo.title
    const description = seo.description
    const canonical = seo.og_url || null
    const noindex = seo.noindex ? true : false

    const data = {
      title,
      description,
      canonical,
      noindex
    }

    return data
  } else {
    return null
  }
}
