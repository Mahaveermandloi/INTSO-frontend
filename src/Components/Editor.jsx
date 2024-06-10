
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Editor.css";

const Editor = ({ value, onChange }) => {
  return (
    <>
      <div className="App">
        <h2 className="block text-sm font-medium mb-1">Description</h2>
        <CKEditor
          editor={ClassicEditor}
          data={value} // Set the initial editor content
         
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data); // Call the callback function with the editor data
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </>
  );
};

export default Editor;
