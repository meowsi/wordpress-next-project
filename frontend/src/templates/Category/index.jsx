import Button from '../../components/Button'
import Base from '../Base'
import * as S from './styles'

export default function CategoryTemplate({ seo, header, footer, page, posts }) {
  return (
    <Base seo={seo} header={header} footer={footer}>
      <S.Wrapper>
        Posts by category:
        {posts &&
          posts.map((post, index) => (
            <div key={`post-${index}`}>
              <Button size={'link'} href={`/${post.slug}`}>
                {post.title}
              </Button>
              <br />
            </div>
          ))}
        <br />
        <br />
        {page && (
          <div>
            Detalhes da página <br />
            Possui uma proxima página: {page.hasNextPage ? 'Sim' : 'Não'} <br />
            {page.hasNextPage && <p>Carregar itens após: {page.endCursor}</p>}
          </div>
        )}
      </S.Wrapper>
    </Base>
  )
}
