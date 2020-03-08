import React from 'react';
import { useDrag } from 'react-dnd';

const style = {
    position: 'absolute',
    cursor: 'move',
}

export const Item = ({ itemId, name, type, lastTargetId, hideSourceOnDrag, left }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { id: itemId, name, type, lastTargetId, left },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />
    }

    return <div ref={drag} style={{ ...style, left }}>{name}</div>;
};
