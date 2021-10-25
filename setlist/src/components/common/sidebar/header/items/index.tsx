import React from 'react'
import styled from 'styled-components'
import HeaderTeams from '../teams'
import HeaderButton from '../button'
import LogoutButton from 'components/common/logout'

const variables = {
  color: '#92929d'
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Block = styled.div`
  display: flex;
  justify-content: space-between;
`
const Arrow = styled.div`
  border: solid ${variables.color};
  border-width: 0 2px 2px 0;
  display: flex;
  padding: 3px;
  cursor: pointer;
`
const ArrowDown = styled.div`
  transform: rotate(45deg);
  border: solid ${variables.color};
  border-width: 0 2px 2px 0;
  display: flex;
  padding: 3px;
  cursor: pointer;
`
const ArrowUp = styled.div`
  transform: rotate(135deg);
  border: solid ${variables.color};
  border-width: 0 2px 2px 0;
  display: flex;
  padding: 3px;
  cursor: pointer;
`
const TeamsTitle = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  color: ${variables.color};
  letter-spacing: 1px;
`

const Items = () => {
  const [opened, setOpened] = React.useState<boolean>(false)

  const handleOpened = (): void => {
    setOpened(prevState => !prevState)
  }

  return (
    <Wrapper>
      <Block onClick={handleOpened}>
        <TeamsTitle>Teams</TeamsTitle>
        <div>{opened ? <ArrowDown /> : <ArrowUp />}</div>
      </Block>
      {opened && <HeaderTeams />}
      <HeaderButton />
      <LogoutButton/>
    </Wrapper>
  )
}

export default Items