import React, { useState, useEffect } from 'react';
import axios from 'axios';

const contentHtml = ({ content }) => {
  return {
    __html: content
  }
}

function App() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(process.env.REACT_APP_API_URL);
      setContent(result.data);
    }
    fetch();
  }, []);

  if (!content) {
    return (
      <p>Loading...</p>
    )
  }
 
  return (
    <div>
      <h1>Technically Leicester</h1>
      <h2>{ content.headline }</h2>
      <h1>{ content.contentHeading }</h1>
      <div dangerouslySetInnerHTML={contentHtml(content)} />
      <h2>{ content.feedbackHeading }</h2>
      <h2>{ content.feedbackPrivacy }</h2>
    </div>
  );
}

export default App;
