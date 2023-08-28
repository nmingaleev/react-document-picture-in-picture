import React, { createElement, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Placeholder } from './placeholder';

import './RenderWithPictureInPicture.css';

export const RenderWithPictureInPicture = ({component}) => {
  const [isOpenInNewWindow, setIsOpenInNewWindow] = useState(false);
  const componentRef = useRef();

  const reactEl = createElement(component, { ref: (ref) => {
    componentRef.current = ref;
  }});

  const handleOpenInNewWindow = async () => {
    if ('documentPictureInPicture' in window) {
      const pipWindow = await window.documentPictureInPicture.requestWindow();

      // Copy style sheets over from the initial document
      // so that the player looks the same.
      [...document.styleSheets].forEach((styleSheet) => {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
        const style = document.createElement('style');

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      });

      pipWindow.addEventListener('load', () => {
        const pipRoot = ReactDOM.createRoot(pipWindow.document.body);
        pipRoot.render(reactEl);
      });

      pipWindow.addEventListener('pagehide', () => {
        setIsOpenInNewWindow(false);
      })

      setIsOpenInNewWindow(true);
    }
  }

  return (
    <div className='r-pip'>
      <button className='r-pip__open-btn' onClick={handleOpenInNewWindow}>Open in new window</button>

      <div className='r-pip__container'>
        {!isOpenInNewWindow && reactEl}

        {isOpenInNewWindow && (
          <Placeholder
           className='r-pip__placeholder'
           target={componentRef.current}
           >
            Opened in new window
          </Placeholder>
        )}
      </div>
    </div>
  );
}