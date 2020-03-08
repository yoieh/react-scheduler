import React, { useRef /*, useEffect*/ } from 'react';
import { useDrop } from 'react-dnd';
import { Item } from './Item';

import { FlexRow, TargetLabel } from './StyledComponents';



export const TargetRow = ({ targeId, name, accept, items, onDrop, hideSourceOnDrag, labelWidth = 110 }) => {
    const ref = useRef(null);
    const [props, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    // useEffect(() => {
    //     const width = ref.current ? ref.current.offsetWidth : 0;
    //     console.log('width', width);
    // }, [ref.current]);

    return (
        <FlexRow>
            <TargetLabel border={true} labelWidth={labelWidth}>{name}</TargetLabel>
            <FlexRow ref={ref}  border={true}>
                <FlexRow ref={drop}>
                    {items.map(({ id: itemId, name, type, left }) =>
                        <Item key={itemId} itemId={itemId} name={name} type={type} lastTargetId={targeId} left={left} hideSourceOnDrag={hideSourceOnDrag} />
                    )}
                </FlexRow>
            </FlexRow>
        </FlexRow >
    )
};

