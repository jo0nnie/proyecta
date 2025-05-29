import React from 'react';
import reactLogo from '../assets/react.svg'

function ReactImg({colordefondoimagen, children}) {
    return (
                <a href="https://react.dev" 
                target="_blank" 
                style={{ backgroundColor: colordefondoimagen }}>
            
          <img src={reactLogo} className="logo react" alt="React logo" />
          {children}
        </a>
    );
}

export default ReactImg;

