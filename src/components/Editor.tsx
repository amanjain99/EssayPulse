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
      <div className="flex items-center gap-1 p-3 border-b border-border bg-bg-secondary/50 rounded-t-xl">
        <button
          onClick={toggleBold}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("bold")
              ? "bg-accent text-bg-primary"
              : "hover:bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
          title="Bold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
        </button>
        <button
          onClick={toggleItalic}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("italic")
              ? "bg-accent text-bg-primary"
              : "hover:bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
          title="Italic"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m-2 0v16m4-16h-4m0 16h4" transform="skewX(-10)" />
          </svg>
        </button>
        <button
          onClick={toggleUnderline}
          className={`p-2 rounded-lg transition-colors ${
            editor.isActive("underline")
              ? "bg-accent text-bg-primary"
              : "hover:bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
          title="Underline"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v7a5 5 0 0010 0V4M5 20h14" />
          </svg>
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6 overflow-y-auto bg-bg-primary rounded-b-xl">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}

