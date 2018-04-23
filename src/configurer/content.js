import React from 'react';
import ReactQuill from 'react-quill';

import 'quill/dist/quill.snow.css';

export default ({ value, encoders, decoders, onUpdate }) => (
  <ReactQuill
    value={decoders.string(true, value)}
    modules={{
      toolbar: [
        [{ 'font': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    }}
    onChange={html => {
      onUpdate(encoders.string(true, html));
    }} />
);
