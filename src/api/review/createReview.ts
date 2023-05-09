import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateReview } from "@type/commentOrReview";
import { useRouter } from "next/router";

// 교육 게시판 리뷰
export const createReview = async (data: ICreateReview) => {
  try {
    await axios.post(`/review`, data);
    return true;
  } catch (err) {
    return false;
  }
};

// 교육 게시판 리뷰 Mutation
export const useCreateReviewMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["educationDetail", variables.educationId],
      });

      router.push(`/educations/${variables.educationId}`);
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("완료");
    },
  });
};
