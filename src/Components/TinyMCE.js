import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE(props) {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    props.onEditorChange(content);
  };

  return (
    <>
      <Editor
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'a11ychecker',
            'advlist',
            'advcode',
            'advtable',
            'autolink',
            'checklist',
            'export',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'powerpaste',
            'fullscreen',
            'formatpainter',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          setup: function (editor) {
            editor.on('keydown', function (e) {
              if (e.keyCode === 9) { // Tab key
                if (e.shiftKey) {
                  editor.execCommand('Outdent');
                } else {
                  editor.execCommand('Indent');
                }
                e.preventDefault();
                return false;
              }
            });
          },
          toolbar:
            'undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help | image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
        }}
      />
    </>
  );
}
