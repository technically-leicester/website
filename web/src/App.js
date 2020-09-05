import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contact from './Contact/Contact'
import './Shared/FollowUs.css'
import './Shared/Icon.css'
import './Shared/TechnicallyHeader.css'

const contentHtml = ({ content }) => {
  return {
    __html: content
  }
}

function App() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get('/api/content');
      setContent(result.data);
    }
    fetch();
  }, []);

  if (!content) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    )
  }
 
  return (
    <>
    <section className="technically-header">
      <div className="container">
        <h1 className="logo"><span className="description">Technically Leicester</span></h1>
        <h2 className="tagline">{ content.headline }</h2>
      </div>
    </section>
    <div className="container narrow">
      <h1>{ content.contentHeading }</h1>
      <div dangerouslySetInnerHTML={contentHtml(content)} />
    </div>
    <Contact heading={ content.feedbackHeading } privacy={ content.feedbackPrivacy } />
    <section className="follow-us">
      <div className="container narrow">
        <ul>
          { content.links && content.links.map(link => (
          <li>
            <a href={link.url}>
              <i className={`icon ${link.slug}`} />
              <span className="description">{link.slug}</span>
            </a>
          </li>
          ))}
        </ul>
      </div>
    </section>
    <footer className="technically-footer">
      <div className="container">
        <span>&copy; Technically Leicester</span>
      </div>
    </footer>
    </>
  );
}

export default App;
