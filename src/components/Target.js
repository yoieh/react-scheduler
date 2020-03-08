import React from 'react';
import { useDrop } from 'react-dnd';
import { Item } from './Item';

export const Target = ({ targeId, name, accept, items, onDrop }) => {
    const [collectedProps, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return <div style={{
        border: "solid 1px black",
        flex: 1,
        flexDirection: "column"
    }} ref={drop}>{items.map(({ id: itemId, name, type }) => <Item key={itemId} itemId={itemId} name={name} type={type} lastTargetId={targeId} {...collectedProps} />)}</div>;
};

export const TargetRow = ({ targeId, name, accept, items, onDrop, hideSourceOnDrag }) => {
    const [, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: monitor => ({
            isOver: () => monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    return <div style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
        <span style={{ width: '110px' }}>{name}</span>
        <div ref={drop} style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
            {items.map(({ id: itemId, name, type, left }) =>
                <Item key={itemId} itemId={itemId} name={name} type={type} lastTargetId={targeId} left={left} hideSourceOnDrag={hideSourceOnDrag} />)}
        </div>

    </div>

    // return <div style={{
    //     border: "solid 1px black",
    //     flex: 1,
    //     flexDirection: "column"
    // }} ref={drop}>{items.map(({ id: itemId, name, type }) => <Item key={itemId} itemId={itemId} name={name} type={type} lastTargetId={targeId} {...collectedProps} />)}</div>;
};

