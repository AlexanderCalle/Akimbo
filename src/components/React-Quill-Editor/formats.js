import { Quill } from 'react-quill';
import CustomVideo from './extensions/custom-video';
import CustomIframe from './extensions/custom-iframe';

// Register custom formats
Quill.register({
  'formats/video': CustomVideo,
  'formats/iframe': CustomIframe
});

export { CustomVideo, CustomIframe }; 