import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { RootCommentWithReplyCount } from "@/features/comments/comments.schema";
import { repliesByRootIdInfiniteQuery } from "@/features/comments/queries";
import { authClient } from "@/lib/auth/auth.client";
import { m } from "@/paraglide/messages";
import { CommentItem } from "./comment-item";
import { CommentReplyForm } from "./comment-reply-form";

// Alias for local use
type RootCommentWithUser = RootCommentWithReplyCount;

interface CommentListProps {
  rootComments: Array<RootCommentWithUser>;
  postId: number;
  onReply?: (rootId: number, commentId: number, userName: string) => void;
  onDelete?: (commentId: number) => void;
  replyTarget?: { rootId: number; commentId: number; userName: string } | null;
  onCancelReply?: () => void;
  onSubmitReply?: (content: JSONContent) => Promise<void>;
  isSubmittingReply?: boolean;
  initialExpandedRootId?: number;
  highlightCommentId?: number;
}

export const CommentList = ({
  rootComments,
  postId,
  onReply,
  onDelete,
  replyTarget,
  onCancelReply,
  onSubmitReply,
  isSubmittingReply,
  initialExpandedRootId,
  highlightCommentId,
}: CommentListProps) => {
  const { data: session } = authClient.useSession();
  const [expandedRoots, setExpandedRoots] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (initialExpandedRootId) {
      setExpandedRoots((prev) => new Set(prev).add(initialExpandedRootId));
    }
  }, [initialExpandedRootId]);

  const toggleExpand = (targetRootId: number) => {
    setExpandedRoots((prev) => {
      const next = new Set(prev);
      if (next.has(targetRootId)) {
        next.delete(targetRootId);
      } else {
        next.add(targetRootId);
      }
      return next;
    });
  };

  if (rootComments.length === 0) {
    return (
      <div className="glass-card py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] font-mono text-white/40">
          {m.comments_list_empty()}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10">
      {rootComments.map((root) => (
        <RootCommentWithReplies
          key={root.id}
          root={root}
          postId={postId}
          isExpanded={expandedRoots.has(root.id)}
          onToggleExpand={() => toggleExpand(root.id)}
          onReply={onReply}
          onDelete={onDelete}
          replyTarget={replyTarget}
          onCancelReply={onCancelReply}
          onSubmitReply={onSubmitReply}
          isSubmittingReply={isSubmittingReply}
          session={session}
          highlightCommentId={highlightCommentId}
        />
      ))}
    </div>
  );
};

interface RootCommentWithRepliesProps {
  root: RootCommentWithUser;
  postId: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onReply?: (rootId: number, commentId: number, userName: string) => void;
  onDelete?: (commentId: number) => void;
  replyTarget?: { rootId: number; commentId: number; userName: string } | null;
  onCancelReply?: () => void;
  onSubmitReply?: (content: JSONContent) => Promise<void>;
  isSubmittingReply?: boolean;
  session: AuthContext["session"] | null;
  highlightCommentId?: number;
}

function RootCommentWithReplies({
  root,
  postId,
  isExpanded,
  onToggleExpand,
  onReply,
  onDelete,
  replyTarget,
  onCancelReply,
  onSubmitReply,
  isSubmittingReply,
  session,
  highlightCommentId,
}: RootCommentWithRepliesProps) {
  const {
    data: repliesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    repliesByRootIdInfiniteQuery(postId, root.id, session?.user.id),
  );

  const allReplies = repliesData?.pages.flatMap((page) => page.items) ?? [];
  const isReplyingToRoot =
    replyTarget &&
    replyTarget.rootId === root.id &&
    replyTarget.commentId === root.id;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <CommentItem
        comment={root}
        onReply={() => {
          if (onReply) {
            onReply(
              root.id,
              root.id,
              root.user?.name || m.comments_item_unknown_user(),
            );
          }
        }}
        onDelete={onDelete}
        highlightCommentId={highlightCommentId}
        className={root.replyCount > 0 ? "pb-2 border-b-0" : ""}
      />

      {isReplyingToRoot && (
        <div className="py-6 ml-12 px-0 animate-in fade-in slide-in-from-top-2 duration-300">
          {session ? (
            onSubmitReply && onCancelReply ? (
              <CommentReplyForm
                parentUserName={replyTarget.userName}
                onSubmit={onSubmitReply}
                isSubmitting={isSubmittingReply ?? false}
                onCancel={onCancelReply}
                className="mt-0"
              />
            ) : null
          ) : (
            <div className="glass-card flex items-center gap-4 py-4 px-4">
              <span className="text-[10px] text-white/50 uppercase tracking-wider flex-1">
                {m.comments_list_login_to_reply({
                  userName: replyTarget.userName,
                })}
              </span>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-card h-7 px-3 text-[9px] uppercase tracking-widest font-bold border-0 bg-transparent hover:bg-white/10 hover:text-white transition-all"
                >
                  {m.comments_login()}
                </Button>
              </Link>
              <button
                onClick={onCancelReply}
                className="text-[9px] uppercase tracking-widest font-bold text-white/30 hover:text-white transition-colors"
              >
                {m.comments_editor_cancel()}
              </button>
            </div>
          )}
        </div>
      )}

      {root.replyCount > 0 && (
        <div className="ml-12 mt-2">
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-3 group mt-1 mb-1"
          >
            <div
              className={`h-px bg-white/20 transition-all duration-300 ${isExpanded ? "w-12 bg-accent/60" : "w-8 group-hover:w-12 group-hover:bg-accent/40"}`}
            />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:text-accent transition-colors">
              {isExpanded
                ? m.comments_list_collapse_replies()
                : m.comments_list_expand_replies({ count: root.replyCount })}
            </span>
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-2 pl-6">
              {allReplies.map((reply) => {
                const isReplyingToThis =
                  replyTarget &&
                  replyTarget.rootId === root.id &&
                  replyTarget.commentId === reply.id;
                return (
                  <div key={reply.id}>
                    <CommentItem
                      comment={reply}
                      onReply={() => {
                        if (onReply) {
                          onReply(
                            root.id,
                            reply.id,
                            reply.replyTo?.name ||
                              reply.user?.name ||
                              m.comments_item_unknown_user(),
                          );
                        }
                      }}
                      onDelete={onDelete}
                      isReply
                      replyToName={reply.replyTo?.name}
                      highlightCommentId={highlightCommentId}
                    />
                    {isReplyingToThis && (
                      <div className="py-6 ml-0 px-0 animate-in fade-in slide-in-from-top-2 duration-300">
                        {session ? (
                          <CommentReplyForm
                            parentUserName={replyTarget.userName}
                            onSubmit={onSubmitReply!}
                            isSubmitting={isSubmittingReply!}
                            onCancel={onCancelReply!}
                            className="mt-0"
                          />
                        ) : (
                          <div className="glass-card flex items-center gap-4 py-4 px-4">
                            <span className="text-[10px] text-white/50 uppercase tracking-wider flex-1">
                              {m.comments_list_login_to_reply({
                                userName: replyTarget.userName,
                              })}
                            </span>
                            <Link to="/login">
                              <Button
                                variant="outline"
                                size="sm"
                                className="glass-card h-7 px-3 text-[9px] uppercase tracking-widest font-bold border-0 bg-transparent hover:bg-white/10 hover:text-white transition-all"
                              >
                                {m.comments_login()}
                              </Button>
                            </Link>
                            <button
                              onClick={onCancelReply}
                              className="text-[9px] uppercase tracking-widest font-bold text-white/30 hover:text-white transition-colors"
                            >
                              {m.comments_editor_cancel()}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {hasNextPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="glass-card h-7 px-3 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white bg-transparent hover:bg-white/5 mt-2 border-0"
                >
                  {isFetchingNextPage
                    ? m.comments_loading()
                    : m.comments_list_load_more_replies()}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
