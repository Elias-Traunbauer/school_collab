import React from 'react';

const FileIcon = ({ fileType }) => {
  let icon = '';

  switch (fileType) {
    case 'pdf':
      icon = 'pdf-icon.svg';
      break;
    case 'doc':
      icon = 'doc-icon.svg';
      break;
    case 'xls':
      icon = 'xls-icon.svg';
      break;
    case 'png':
    case 'jpg':
    case 'jpeg':
      icon = 'image-icon.svg';
      break;
    case 'mp3':
    case 'wav':
      icon = 'audio-icon.svg';
      break;
    default:
      icon = 'default-icon.svg';
      break;
  }

  return <img src={`/icons/${icon}`} alt={`${fileType}-icon`} />;
};

export default FileIcon;