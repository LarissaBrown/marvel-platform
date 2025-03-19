import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import editorStyles from './editorStyles';

const SlideEditor = ({ content = '', onChange }) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setEditorContent(newContent);
      onChange(newContent);
    },
  });

  useEffect(() => {
    if (editor && content !== editorContent) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor, editorContent]);

  return (
    <div className="editorContainer" style={editorStyles.editorContainer}>
      {editor ? (
        <>
          {/* Bubble Menu (appears when text is selected) */}
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div style={editorStyles.menu}>
              <button onClick={() => editor.chain().focus().toggleBold().run()} style={editor.isActive('bold') ? editorStyles.activeButton : editorStyles.button}>
                B
              </button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} style={editor.isActive('italic') ? editorStyles.activeButton : editorStyles.button}>
                I
              </button>
              <button onClick={() => editor.chain().focus().toggleStrike().run()} style={editor.isActive('strike') ? editorStyles.activeButton : editorStyles.button}>
                S
              </button>
            </div>
          </BubbleMenu>

          {/* Floating Menu (appears when clicked anywhere in the content area) */}
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div style={editorStyles.menu}>
              <button onClick={() => editor.chain().focus().setParagraph().run()} style={editor.isActive('paragraph') ? editorStyles.activeButton : editorStyles.button}>
                P
              </button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={editor.isActive('heading', { level: 2 }) ? editorStyles.activeButton : editorStyles.button}>
                H2
              </button>
              <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={editor.isActive('bulletList') ? editorStyles.activeButton : editorStyles.button}>
                • List
              </button>
            </div>
          </FloatingMenu>

          {/* Main Editor Content */}
          <EditorContent editor={editor} />
        </>
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  );
};

export default SlideEditor;

