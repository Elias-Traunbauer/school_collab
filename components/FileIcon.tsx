import React from 'react';
import Image from 'next/image';

const FileIcon = ({ fileType }) => {
  let icon = '';

  switch (fileType) {
    case 'pdf':
      icon = 'pdf.svg';
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

  return <Image src={`/${icon}`} alt={`${fileType}-icon`} width={100} height={100}/>;
};

export default FileIcon;
