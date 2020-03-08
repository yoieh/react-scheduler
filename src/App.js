import React from 'react';
import './App.css';

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import SchedulerContainer from './containers/SchedulerContainer';

function App() {
  return (
    <DndProvider backend={Backend}>
      <SchedulerContainer></SchedulerContainer>
    </DndProvider>
  );
}

export default App;
