import Base from '../Base'
import * as S from './styles'

// import dynamic from 'next/dynamic'
// Insert dynamic
// https://nextjs.org/docs/advanced-features/preview-mode
// Insert a preview mode

export default function PostTemplate({ seo, header, footer, post }) {
  return (
    <Base seo={seo} header={header} footer={footer}>
      <S.Wrapper>
        <h1>{post.title}</h1>
        <br />
        <p>{post.content.replace(/<[^>]*>?/gm, '')}</p>
      </S.Wrapper>
    </Base>
  )
}
