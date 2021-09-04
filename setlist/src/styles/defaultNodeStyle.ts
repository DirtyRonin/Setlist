import styled from "styled-components";

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
  border: 1px dashed white;
  opacity: 1;
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
