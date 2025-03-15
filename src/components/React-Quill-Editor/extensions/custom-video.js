import { Quill } from "react-quill";

var Video = Quill.import('formats/video');
var Link = Quill.import('formats/link');

class CustomVideo extends Video {
  static create(value) {
    const node = super.create(value);

    const video = document.createElement('video');
    video.setAttribute('controls', true);
    video.setAttribute('type', 'video/mp4');
    video.setAttribute('style', 'width: 100%');
    video.setAttribute('src', this.sanitize(value));
    node.appendChild(video);

    return node;
  }

  static sanitize(url) {
    return Link.sanitize(url);
  }
}
CustomVideo.blotName = 'video';
CustomVideo.className = 'ql-video';
CustomVideo.tagName = 'DIV';

export default CustomVideo;