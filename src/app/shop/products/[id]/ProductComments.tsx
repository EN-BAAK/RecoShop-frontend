"use client"

import { Form, Formik, FormikHelpers } from "formik";
import InputField from "@/components/forms/InputField";
import { ProductCommentsProps } from "@/types/components";
import { postComment as postCommentValidation } from "@/constants/formValidation";
import { postComment as postCommentInitialValues } from "@/constants/formValues";
import SubmitButton from "@/components/forms/SubmitButton";
import Avatar from "@/components/Avatar";
import { useGetProductComments, usePostComment } from "@/hooks/useComment";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/helpers";
import { Comment, CommentCreation } from "@/types/global";
import CustomButton from "@/components/forms/Button";

const ProductComments: React.FC<ProductCommentsProps> = ({ productId }) => {
  const { data, isFetching, fetchNextPage, refetch, hasNextPage } = useGetProductComments({ productId, limit: 5 })
  const { mutateAsync } = usePostComment()
  const comments = data?.pages?.flatMap((page) => page.data.items) ?? [];

  const onSubmit = async (values: CommentCreation, formik: FormikHelpers<CommentCreation>) => {
    await mutateAsync({ comment: values.comment, productId })
    formik.resetForm()
    formik.setSubmitting(false)
    refetch()
  }

  return (
    <div className="pt-6 space-y-6 border-t border-muted">
      <div>
        <h3 className="mb-1 font-heading font-semibold text-xl text-primary">
          Comments
        </h3>

        <div className="space-y-4">
          {comments.map((comment: Comment) => (
            <div key={comment.id} className="bg-muted/30 p-4 rounded-lg">
              <div className="mb-2 flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar firstName={comment.name} width={25} height={25} />
                  <p className="font-heading font-semibold text-foreground">
                    {comment.name}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs">
                  {
                    new Date(comment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })
                  }
                </span>
              </div>
              <p className="text-sm text-foreground">{comment.comment}</p>
            </div>
          ))}

          {isFetching && (
            <div className="space-y-3">
              {range(1, 3).map((_, i) => (
                <div key={i} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="bg-muted h-6 w-6 rounded-full" />
                    <Skeleton className="bg-muted h-4 w-24" />
                  </div>
                  <Skeleton className="bg-muted h-4 w-full" />
                  <Skeleton className="bg-muted h-4 w-3/4 mt-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        {hasNextPage && !isFetching && (
          <div className="pt-4 flex justify-end">
            <CustomButton className="w-fit text-xs" label="Load More..." variant="transparent" onClick={fetchNextPage} />
          </div>
        )}
      </div>

      <Formik
        initialValues={postCommentInitialValues}
        validationSchema={postCommentValidation}
        onSubmit={onSubmit}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className="flex items-center gap-3">
            <InputField
              name="comment"
              type="text"
              placeholder="Write your comment..."
              styles="flex-1"
            />

            <SubmitButton
              className="w-fit"
              isDirty={dirty}
              isSubmitting={isSubmitting}
              isValid={isValid}
              label="Post"
              disabledLabel="Post"
              submittingLabel="Posting..."
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductComments