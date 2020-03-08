import styled from 'styled-components';

export const TargetLabel = styled.div`
    width: ${({ labelWidth = 110 }) => labelWidth}px;
    border: ${({ border = false }) => border ? '1px solid gray' : 0};
`

export const FlexRow = styled.div`
    display: flex; 
    flex: 1; 
    flex-direction: row;
    border: ${({ border = false }) => border ? '1px solid gray' : 0};
`

export const FlexColumn = styled.div`
    display: flex; 
    flex: 1; 
    flex-direction: column;
    border: ${({ border = false }) => border ? '1px solid gray' : 0};
`
