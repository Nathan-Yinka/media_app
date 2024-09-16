import { useCallback, useMemo, useRef, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

import React from 'react'

const TextEditor = ({value,setValue}) => {
    const quill = useRef();

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", file.name);
        const baseServerUrl = import.meta.env.VITE_PUBLIC_BASEURL;
        try {
          const response = await fetch(`${baseServerUrl}/blog/upload/`, {
            method: 'POST',
            body: formData,
            headers: {'authorization': "Bearer 9d8b1624135acc259278ece5000e3e8dd9a1962b"}
          });
          const data = await response.json();
          console.log(data);
          const imageUrl = data.image;

          const quillEditor = quill.current.getEditor();
          const range = quillEditor.getSelection(true);
          quillEditor.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];
  return (
    <div className="">
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className="h-[300px] pb-16 mb-5"
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}

export default TextEditor
