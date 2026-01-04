import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect, useCallback, useRef } from "react";

interface EditorProps {
  content: string;
  onUpdate: (content: string, wordCount: number, paragraphCount: number) => void;
  placeholder?: string;
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

function countParagraphs(html: string): number {
  const paragraphs = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  return paragraphs.filter((p) => {
    const text = p.replace(/<[^>]*>/g, "").trim();
    return text.length > 0;
  }).length;
}

export function Editor({ content, onUpdate, placeholder }: EditorProps) {
  const isInitialMount = useRef(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: placeholder || "Begin your story here...",
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const words = countWords(html);
      const paragraphs = countParagraphs(html);
      onUpdate(html, words, paragraphs);
    },
  });

  // Update content when it changes externally (e.g., initial load)
  useEffect(() => {
    if (editor && isInitialMount.current && content) {
      editor.commands.setContent(content);
      isInitialMount.current = false;
    }
  }, [editor, content]);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="tw-editor-toolbar">
        <button
          onClick={toggleBold}
          className={`tw-key ${editor.isActive("bold") ? "active" : ""}`}
          title="Bold"
        >
          B
        </button>
        <button
          onClick={toggleItalic}
          className={`tw-key ${editor.isActive("italic") ? "active" : ""}`}
          title="Italic"
          style={{ fontStyle: "italic" }}
        >
          I
        </button>
        <button
          onClick={toggleUnderline}
          className={`tw-key ${editor.isActive("underline") ? "active" : ""}`}
          title="Underline"
          style={{ textDecoration: "underline" }}
        >
          U
        </button>
      </div>

      {/* Editor */}
      <div className="tw-editor-content flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
