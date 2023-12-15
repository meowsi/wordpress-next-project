import React from 'react'

import Button from '../../components/Button'
import { Container } from '../Container'
import * as S from './styles'

const Header = ({ menus }) => {
  return (
    <S.Wrapper>
      <Container>
        <h2>Header</h2>

        {menus &&
          menus.map((menu, index) => (
            <div key={`menu-${index}`}>
              <Button route={true} size={'link'} href={`${menu.uri}`}>
                {menu.label}
              </Button>
              <br />
            </div>
          ))}
      </Container>

      <br />
      <br />
    </S.Wrapper>
  )
}

export default Header
