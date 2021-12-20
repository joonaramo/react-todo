import React, { useEffect, useMemo, useState } from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Tag } from './types';
import { TagContext } from './contexts/Tag';
import { getTags } from './services/tag';

function App() {
  const [tags, setTags] = useState<Tag[]>([]);

  const value = useMemo(() => ({ tags, setTags }), [tags, setTags]);

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTags();
      setTags(data);
    };
    fetchTags();
  }, []);

  // Use context for tags so they can be accessed from Sidebar component as well
  return (
    <TagContext.Provider value={value}>
      <Router>
        <AppRoutes />
      </Router>
    </TagContext.Provider>
  );
}

export default App;
