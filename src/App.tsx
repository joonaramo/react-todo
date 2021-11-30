import React, { useMemo, useState } from 'react';
import './App.css';
import { AppRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Tag } from './types';
import { TagContext } from './contexts/Tag';

function App() {
  const [tags, setTags] = useState<Tag[]>([]);

  const value = useMemo(() => ({ tags, setTags }), [tags, setTags]);

  return (
    <TagContext.Provider value={value}>
      <Router>
        <AppRoutes />
      </Router>
    </TagContext.Provider>
  );
}

export default App;
