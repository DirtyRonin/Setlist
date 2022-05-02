import styled from "styled-components";
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

// export const DefaultNodeWrapperStyle = styled.div`
// min-width: 235px;
// min-height: 104px;
// background-color: white;
// border-radius: 20px;
// border: 1px solid #e2e2ea;
// padding: 20px;
// margin: 5px 10px 0px 10px;
// }`

export const DefaultNodeWrapperStyle = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction:row;
  border-radius: 20px;
  padding: 15px;
  margin: 0 5px 10px 5px;
  background: white;
  border: 1px solid white;
  opacity: 1;
  transition: 0.2s;
  &:hover {
    background: linear-gradient(45deg, #DA4453, #89216B);
  }
`

export const DefaultNodeImageStyle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #e2e2ea;
  img {
    width: 45px;
    height: 45px;
  }
`
export const DefaultLabelStyle = styled.label`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`

export const DefaultSongNodeStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);
