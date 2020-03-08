import React, { useState, useCallback } from 'react';
import ItemTypes from '../ItemTypes';
import { Target } from '../components/Target';
import update from "immutability-helper";

export const ListsContainer = () => {
  const [storedItems, setStoredItems] = useState([
    { id: 1, name: "item A", type: ItemTypes.ITEM },
    { id: 2, name: "item B", type: ItemTypes.ITEM },
    { id: 3, name: "item C", type: ItemTypes.ITEM },
    { id: 4, name: "item D", type: ItemTypes.ITEM }
  ]);

  const [targets, setTargets] = useState([
    {
      id: 1,
      name: "target1",
      accepts: [ItemTypes.ITEM],
      items: [
        ...storedItems,
      ],
    }, {
      id: 2,
      name: "target2",
      accepts: [ItemTypes.ITEM],
      items: []
    }
  ]);

  const handleDrop = useCallback(
    (index, item) => {
      const { id, lastTargetId } = item;
      const lastIndex = targets.map(target => target.id).indexOf(lastTargetId);
      const removeIndex = targets[lastIndex].items.map(item => item.id).indexOf(id);

      setTargets(
        update(targets, index !== lastIndex ? {
          [index]: {
            items: {
              $push: [item]
            }
          },
          [lastIndex]: {
            items: {
              $splice: [[removeIndex, 1]]
            }
          }
        } : {})
      );
    },
    [targets]
  );

  return (<div style={{
    display: "flex",
    flex: 1,
    flexDirection: "row",
    height: "100vh"
  }}>
    {targets.map(({ id, name, accepts, items }, index) => <Target key={id} targeId={id} name={name} accept={accepts} items={items} onDrop={item => handleDrop(index, item)} />)}
  </div>);
};
