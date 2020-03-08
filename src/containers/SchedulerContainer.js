import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { format, eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import svLocal from 'date-fns/locale/sv';

import { TargetRow } from '../components/Target';
import ItemTypes from '../ItemTypes';
import update from "immutability-helper";

const resources = [
    {
        id: 1, name: "Res1", accepts: ItemTypes.ITEM, items: [
            { id: 1, name: "item A", type: ItemTypes.ITEM, left: 80 },
            { id: 2, name: "item B", type: ItemTypes.ITEM, left: 80 },
            { id: 3, name: "item C", type: ItemTypes.ITEM, left: 80 },
            { id: 4, name: "item D", type: ItemTypes.ITEM, left: 80 }
        ]
    },
    { id: 2, name: "Res2", accepts: ItemTypes.ITEM, items: [] },
    { id: 3, name: "Res3", accepts: ItemTypes.ITEM, items: [] },
    { id: 4, name: "Res4", accepts: ItemTypes.ITEM, items: [] },
    { id: 5, name: "Res5", accepts: ItemTypes.ITEM, items: [] }
];

export const Grid = () => {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
        hideSourceOnDrag,
    ])

    const dates = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    }).map(date => format(date, 'P', { locale: svLocal }))

    const data = resources.map(r => (
        { ...r, dates: dates }
    ));

    const [targets, setTargets] = useState(data);

    const handleDrop = useCallback(
        (index, item, monitor) => {
            const { id, lastTargetId } = item;
            const lastIndex = targets.map(target => target.id).indexOf(lastTargetId);
            const itemIndex = targets[lastIndex].items.map(item => item.id).indexOf(id);

            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);

            setTargets(
                update(targets, index !== lastIndex ? {
                    [index]: {
                        items: {
                            $push: [{ ...item, left }]
                        }
                    },
                    [lastIndex]: {
                        items: {
                            $splice: [[itemIndex, 1]]
                        }
                    }
                } : {
                        [lastIndex]: {
                            items: {
                                [itemIndex]: {
                                    $merge: { left }
                                }
                            }
                        }
                    })
            );
        },
        [targets]
    );

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
                    <span style={{ width: '110px' }}>Resources</span>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                        {dates.map(date => <span key={date} style={{ flex: '1' }}>{date}</span>)}
                    </div>
                </div>

                {targets.map(({ id, name, accepts, items }, index) => (
                    <TargetRow key={id} targeId={id} name={name} accept={accepts} items={items} onDrop={(item, monitor) => handleDrop(index, item, monitor)} hideSourceOnDrag={hideSourceOnDrag} />
                ))}
            </div>
        </div>
    )
}


const SchedulerContainer = props => {
    return (
        <div>
            <Grid></Grid>
        </div>
    )
}

SchedulerContainer.propTypes = {

}

export default SchedulerContainer
