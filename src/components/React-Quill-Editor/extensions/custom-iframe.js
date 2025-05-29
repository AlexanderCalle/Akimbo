import { Quill } from 'react-quill';

var Link = Quill.import('formats/link');
const BlockEmbed = Quill.import('blots/block/embed');

class CustomIframe extends BlockEmbed {
  static create(value) {
    console.log('Creating iframe with value:', value);
    const node = super.create();
    
    let iframe = document.createElement('iframe');
    
    // Handle different value types
    if (typeof value === 'object' && value !== null) {
      // Handle object format from paste handler
      if (value.src) {
        console.log('Setting iframe attributes from object:', value);
        iframe.setAttribute('src', this.sanitize(value.src));
        if (value.width) iframe.setAttribute('width', value.width);
        if (value.height) iframe.setAttribute('height', value.height);
        if (value.style) iframe.setAttribute('style', value.style);
        if (value.allow) iframe.setAttribute('allow', value.allow);
      }
    } else if (typeof value === 'string') {
      // Handle string format (URL or HTML)
      if (value.includes('<iframe')) {
        console.log('Parsing iframe from HTML string');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = value;
        const existingIframe = tempDiv.querySelector('iframe');
        if (existingIframe) {
          // Copy all attributes from the existing iframe
          Array.from(existingIframe.attributes).forEach(attr => {
            iframe.setAttribute(attr.name, attr.value);
          });
        }
      } else {
        // Treat as URL
        console.log('Treating value as URL:', value);
        iframe.setAttribute('src', this.sanitize(value));
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '352');
      }
    }

    // Set default attributes if not already set
    if (!iframe.hasAttribute('frameborder')) {
      iframe.setAttribute('frameborder', '0');
    }
    if (!iframe.hasAttribute('allowfullscreen')) {
      iframe.setAttribute('allowfullscreen', 'true');
    }
    if (!iframe.hasAttribute('style')) {
      iframe.setAttribute('style', 'width: 100%; min-height: 400px;');
    }

    // Add a wrapper div for better styling control
    const wrapper = document.createElement('div');
    wrapper.className = 'ql-iframe-wrapper';
    wrapper.style.cssText = 'position: relative; width: 100%; margin: 1em 0;';
    wrapper.appendChild(iframe);
    
    node.appendChild(wrapper);
    console.log('Created iframe node:', node);
    return node;
  }

  static sanitize(url) {
    if (typeof url === 'string') {
      // If it's an iframe HTML string, extract the src
      if (url.includes('<iframe')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = url;
        const iframe = tempDiv.querySelector('iframe');
        if (iframe) {
          url = iframe.getAttribute('src');
        }
      }
      return Link.sanitize(url);
    }
    return url;
  }

  static value(node) {
    const wrapper = node.querySelector('.ql-iframe-wrapper');
    if (!wrapper) return '';
    
    const iframe = wrapper.querySelector('iframe');
    if (!iframe) return '';
    
    // Return an object with all relevant attributes
    return {
      src: iframe.getAttribute('src'),
      width: iframe.getAttribute('width'),
      height: iframe.getAttribute('height'),
      style: iframe.getAttribute('style'),
      allow: iframe.getAttribute('allow')
    };
  }
}

CustomIframe.blotName = 'iframe';
CustomIframe.className = 'ql-iframe';
CustomIframe.tagName = 'DIV';

// Add styles for the iframe wrapper
const style = document.createElement('style');
style.textContent = `
  .ql-iframe-wrapper {
    position: relative;
    width: 100%;
    margin: 1em 0;
    min-height: 352px;
  }
  .ql-iframe-wrapper iframe {
    border: none;
    width: 100%;
    height: 100%;
    min-height: 352px;
  }
`;
document.head.appendChild(style);

export default CustomIframe; 