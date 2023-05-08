import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { createComment } from "@api/comment/createComment";
import { createReview } from "@api/review/createReview";

import { ICommentOrReviewForm } from "@type/commentOrReview";

export default function CommentInput() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICommentOrReviewForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<ICommentOrReviewForm> = async (data) => {
    // console.log(data);
    // console.log(router.pathname);
    // console.log(router.pathname.split("/")[1])  >>> "posts"

    if (router.pathname.split("/")[1] === "posts") {
      const commentData = {
        postId: router.query.id as string,
        ...data,
      };

      // 자유게시판의 댓글 생성
      await createComment(commentData);
    } else {
      const reviewData = {
        educationId: router.query.id as string,
        ...data,
      };

      // 교육 정보의 리뷰 생성
      await createReview(reviewData);
    }
  };

  return (
    <div className="mb-2 mt-8 rounded-xl bg-blue-100 p-4 ">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="row-start w-full gap-4">
          {/* 닉네임 필드 */}
          <div className="col-start w-full">
            <label htmlFor="nickname" className="mb-1 font-bold">
              닉네임
            </label>

            <input
              {...register("nickname", {
                required: "이름이 필요해요.",
                minLength: {
                  value: 2,
                  message: "최소 두 글자 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 10,
                  message: "최대 10 글자까지 입력할 수 있어요.",
                },
              })}
              id="nickname"
              type="text"
              name="nickname"
              autoComplete="off"
              placeholder="별명"
              maxLength={11}
              className="h-8 w-full rounded-lg placeholder:text-sm"
            />

            <span className="mt-1 text-xs font-bold text-red-500">
              {errors?.nickname?.message}
            </span>
          </div>

          {/* 비밀번호 필드 */}
          <div className="col-start w-full">
            <label htmlFor="password" className="mb-1 font-bold">
              비밀번호
            </label>

            <input
              {...register("password", {
                required: "비밀번호가 필요해요.",
                minLength: {
                  value: 4,
                  message: "최소 네 글자 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 12,
                  message: "최대 12 글자까지 입력할 수 있어요.",
                },
              })}
              id="password"
              type="password"
              name="password"
              autoComplete="off"
              placeholder="4 자 이상"
              maxLength={13}
              className="h-8 w-full rounded-lg placeholder:text-sm"
            />

            <span className="mt-1 text-xs font-bold text-red-500">
              {errors?.password?.message}
            </span>
          </div>
        </div>

        {/* 댓글 필드 */}
        <div className="my-2 flex flex-col">
          <Controller
            {...register("content", {
              required: "댓글을 작성해 주세요.",
              minLength: {
                value: 3,
                message: "최소 세 글자 이상 입력해 주세요.",
              },
              maxLength: {
                value: 500,
                message: "최대 500 글자까지 입력할 수 있어요.",
              },
            })}
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="content"
                name="content"
                rows={2}
                className="resize-none rounded-lg bg-white px-4 py-2 shadow-sm shadow-gray_3 transition-all duration-300 placeholder:text-sm"
                placeholder="자유롭게 댓글을 작성해 보세요."
                maxLength={501}
              />
            )}
          />

          <span className="mt-1 text-xs font-bold text-red-500">
            {errors?.content?.message}
          </span>
        </div>
        <div className="col-center">
          <button type="submit" className="create_btn h-8 w-full">
            댓글 작성
          </button>
        </div>
      </form>
    </div>
  );
}
