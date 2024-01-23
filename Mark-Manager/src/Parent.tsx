// ParentComponent.tsx

import App from './App.tsx';

import SearchDisplay from './Search.tsx';
// import { useState} from 'react';
// import {markDetailsModel} from './App'

function ParentComponent() {
    
    return (
    <div>
      <App/>
       
      <SearchDisplay />
    </div>
  );
}

export default ParentComponent;
