import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  addComment,
  getComments,
  subscribeComments,
} from "../../services/commentService";
import CastSection from "./components/CastSection";
import Recommend from "./components/Recommend";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import StillCuts from "./components/StillCuts";
import ThumbnailSection from "./components/ThumbnailSection";

export default function MediaDetail() {
  const { detail, credits, images, similar } =
    useLoaderData() as MediaLoaderData;
  const { type, id } = useParams();
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchInitial = async () => {
      const { comments } = await getComments({
        movieId: type === "movie" ? id : undefined,
        tvId: type === "tv" ? id : undefined,
      });
      setComments(comments);
    };
    fetchInitial();

    const unsubscribe = subscribeComments(
      {
        movieId: type === "movie" ? id : undefined,
        tvId: type === "tv" ? id : undefined,
        sortBy: "createdAt",
        order: "desc",
      },
      (newComments) => {
        setComments(newComments);
      }
    );

    return () => unsubscribe();
  }, [type, id]);

  const handleAddComment = async (
    newComment: Omit<CommentData, "createdAt" | "likes">
  ) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("🚨 로그인 후 이용해주세요!");
      return;
    }

    const fullComment: CommentData = {
      ...newComment,
      movieId: type === "movie" ? id : undefined,
      tvId: type === "tv" ? id : undefined,
      userId: user.uid,
      userName: user.displayName || "익명",
      userPhoto: user.photoURL || null,
      createdAt: Date.now(),
      likes: 0,
    };

    setComments((prev) => [fullComment, ...prev]);

    try {
      await addComment(fullComment);
    } catch (error) {
      console.error("🚨 댓글 등록 실패:", error);
      setComments((prev) =>
        prev.filter((c) => c.createdAt !== fullComment.createdAt)
      );
    }
  };

  return (
    <main className="w-full h-full flex flex-col mb-20 gap-15 2xl:gap-20">
      <ThumbnailSection item={detail} />

      <section className="max-w-screen-2xl mx-auto  px-4 sm:px-8 md:px-40 lg:px-60 2xl:px-80 ">
        <StillCuts images={images} />
      </section>

      <section className="max-w-screen-2xl h-full mx-auto px-4 sm:px-8 md:px-40 lg:px-60 2xl:px-80 ">
        <CastSection credits={credits} />
      </section>

      <section className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-40 lg:px-60 2xl:px-80">
        <Recommend items={similar} />
      </section>
      
      <div className="w-full mx-auto px-4 sm:px-8 md:px-40 lg:px-60 2xl:px-80">
        <ReviewForm onSubmit={handleAddComment} />
        <ReviewList comments={comments} />
      </div>
    </main>
  );
}
