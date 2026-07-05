import type { JSONContent } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { Loader2, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCommentExtensions } from "@/features/comments/components/editor/config";
import { normalizeLinkHref } from "@/lib/links/normalize-link-href";
import { m } from "@/paraglide/messages";
import CommentEditorToolbar from "../editor/comment-editor-toolbar";
import type { ModalType } from "../editor/comment-insert-modal";
import InsertModal from "../editor/comment-insert-modal";

interface CommentEditorProps {
  onSubmit: (content: JSONContent) => Promise<void>;
  isSubmitting?: boolean;
  autoFocus?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export const CommentEditor = ({
  onSubmit,
  isSubmitting,
  autoFocus,
  onCancel,
  submitLabel,
}: CommentEditorProps) => {
  const actualSubmitLabel = submitLabel || m.comments_editor_submit();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalInitialUrl, setModalInitialUrl] = useState("");

  const editor = useEditor({
    extensions: getCommentExtensions(),
    content: "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full bg-transparent py-2 text-sm focus:outline-none placeholder:text-white/20 max-w-none",
      },
    },
  });

  const { isEmpty } = useEditorState({
    editor,
    selector: (ctx) => ({
      isEmpty: ctx.editor.isEmpty,
    }),
  });

  const openLinkModal = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    setModalInitialUrl(previousUrl || "");
    setModalType("LINK");
  }, [editor]);

  const openImageModal = useCallback(() => {
    setModalInitialUrl("");
    setModalType("IMAGE");
  }, []);

  const handleSubmit = async () => {
    if (isEmpty || isSubmitting) return;

    try {
      await onSubmit(editor.getJSON());
      editor.commands.clearContent();
    } catch (error) {
      // Error handled by parent hook
    }
  };

  return (
    <div className="glass-card relative group/editor transition-colors duration-300 hover:bg-white/[0.08] focus-within:bg-white/[0.08] overflow-hidden rounded-2xl">
      {/* Toolbar - Always visible at top */}
      <div className="border-b border-white/10 p-1 bg-white/5 backdrop-blur-sm sticky top-0 z-10 w-full">
        <CommentEditorToolbar
          editor={editor}
          onLinkClick={openLinkModal}
          onImageClick={openImageModal}
        />
      </div>

      <EditorContent editor={editor} className="min-h-25 w-full px-4 py-3" />

      <div className="flex items-center justify-between px-4 pb-2 pt-2 border-t border-white/10">
        <div className="text-[10px] font-mono text-white/20 tracking-widest pl-2">
          {m.comments_editor_support_markdown()}
        </div>
        <div className="flex items-center gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              {m.comments_editor_cancel()}
            </button>
          )}
          <Button
            size="sm"
            disabled={isEmpty || isSubmitting}
            onClick={handleSubmit}
            variant="ghost"
            className="glass-card h-8 px-4 text-[10px] font-bold uppercase tracking-widest bg-transparent hover:bg-white/10 hover:text-white p-0 flex items-center gap-2 group/btn border-0 rounded-xl"
          >
            <span>{actualSubmitLabel}</span>
            {isSubmitting ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Send
                size={12}
                className="group-hover/btn:translate-x-0.5 transition-transform"
              />
            )}
          </Button>
        </div>
      </div>

      <InsertModal
        type={modalType}
        initialUrl={modalInitialUrl}
        onClose={() => setModalType(null)}
        onSubmit={(url, attrs) => {
          if (modalType === "LINK") {
            const href = normalizeLinkHref(url);
            if (href === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
            } else {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href })
                .run();
            }
          } else if (modalType === "IMAGE") {
            editor
              .chain()
              .focus()
              .setImage({ src: url, ...attrs })
              .run();
          }
          setModalType(null);
        }}
      />
    </div>
  );
};
