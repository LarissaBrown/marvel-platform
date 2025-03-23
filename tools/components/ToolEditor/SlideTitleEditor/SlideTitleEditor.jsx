/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import editorStyles from '../editorStyles';

const SlideTitleEditor = ({ title = '', onChange }) => {
  const [editorTitle, setEditorTitle] = useState(title);
  const [previousTitle, setPreviousTitle] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Blockquote,
      Heading.configure({ levels: [1, 2, 3] }), // Configure heading levels
    ],
    content: title, // Ensure editor initializes with title
    onUpdate: ({ editor }) => {
      const newTitle = editor.getHTML();
      setEditorTitle(newTitle);
      onChange(newTitle);
    },
  });

  // Ensure the editor gets the correct title on mount
  useEffect(() => {
    if (editor && editor.getHTML() !== title) {
      editor.commands.setContent(title || '');
      setEditorTitle(title);
    }
  }, [title, editor]);

  // Delete title while saving the previous state
  const deleteTitle = useCallback(() => {
    if (editor) {
      setPreviousTitle(editorTitle);
      editor.commands.clearContent();
      setEditorTitle('');
      onChange('');
    }
  }, [editor, editorTitle]);

  // Restore previously deleted title
  const redoTitle = useCallback(() => {
    if (editor && previousTitle) {
      editor.commands.setContent(previousTitle);
      setEditorTitle(previousTitle);
      onChange(previousTitle);
      setPreviousTitle(null);
    }
  }, [editor, previousTitle]);

  return (
    <Grid
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...editorStyles.editorContainer,
        position: 'relative', // Needed for absolute positioning of buttons
      }}
    >
      {editor ? (
        <>
          {/* Bubble Menu (appears when text is selected) */}
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div style={editorStyles.menu}>
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                style={
                  editor.isActive('bold')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                B
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                style={
                  editor.isActive('italic')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                I
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                style={
                  editor.isActive('underline')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                U
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                style={
                  editor.isActive('strike')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                S
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                style={
                  editor.isActive('blockquote')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                ❝
              </Button>
            </div>
          </BubbleMenu>

          {/* Floating Menu (appears when clicked anywhere in the title area) */}
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div style={editorStyles.menu}>
              <Button
                onClick={() => editor.chain().focus().setParagraph().run()}
                style={
                  editor.isActive('paragraph')
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                P
              </Button>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                style={
                  editor.isActive('heading', { level: 2 })
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                H2
              </Button>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                style={
                  editor.isActive('heading', { level: 3 })
                    ? editorStyles.activeButton
                    : editorStyles.button
                }
              >
                H3
              </Button>
            </div>
          </FloatingMenu>

          {/* Main Editor Content */}
          <EditorContent editor={editor} />

          {/* Button Group - Appears at top of hover area */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                gap: '8px',
                padding: '5px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '4px',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                zIndex: 10,
              }}
            >
              <Button
                onClick={deleteTitle}
                variant="contained"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  minWidth: 'unset',
                }}
              >
                Delete
              </Button>
              <Button
                onClick={redoTitle}
                variant="contained"
                disabled={!previousTitle}
                style={{
                  backgroundColor: previousTitle ? 'green' : 'gray',
                  color: 'white',
                  fontSize: '12px',
                  padding: '4px 8px',
                  minWidth: 'unset',
                }}
              >
                Redo
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>Loading editor...</p>
      )}
    </Grid>
  );
};

export default SlideTitleEditor;
