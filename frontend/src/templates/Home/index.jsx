import Button from '../../components/Button'
import Base from '../Base'
import * as S from './styles'

export default function HomeTemplate({
  seo,
  header,
  footer,
  tags,
  categories
}) {
  return (
    <Base seo={seo} header={header} footer={footer}>
      <S.Wrapper>
        <p>Categorias:</p>
        {categories.map((category, index) => (
          <div key={`category-${index}`}>
            <Button
              route={true}
              size={'link'}
              href={`/categoria/${category.slug}`}
            >
              {category.name}
            </Button>

            <br />
          </div>
        ))}
        <br />
        <br />
        <p>Tags:</p>
        {tags.map((tag, index) => (
          <div key={`tag-${index}`}>
            <Button route={true} size={'link'} href={`/tag/${tag.slug}`}>
              {tag.name}
            </Button>
            <br />
          </div>
        ))}
      </S.Wrapper>
    </Base>
  )
}
