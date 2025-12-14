"use client"

import * as Yup from "yup"
import { Form, Formik, useFormik } from "formik";
import InputField from "@/components/forms/InputField";
import { ProductCommentsProps } from "@/types/components";
import { postComment as postCommentValidation } from "@/constants/formValidation";
import { postComment as postCommentInitialValues } from "@/constants/formValues";
import SubmitButton from "@/components/forms/SubmitButton";
import Avatar from "@/components/Avatar";

const mockComments = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "2024-12-10",
    text: "Amazing sound quality! Best headphones I've ever owned."
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "2024-12-08",
    text: "Battery life is incredible. Highly recommend for long commutes."
  },
  {
    id: 3,
    name: "Emma Williams",
    date: "2024-12-05",
    text: "Comfortable even after 8 hours of use. Worth every penny!"
  }
];

const ProductComments: React.FC<ProductCommentsProps> = () => {
  const onSubmit = () => {
    console.log("Posted")
  }

  return (
    <div className="pt-6 space-y-6 border-t border-muted">
      <div>
        <h3 className="mb-1 font-heading font-semibold text-xl text-primary">Comments</h3>
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div key={comment.id} className="bg-muted/30 p-4 rounded-lg">
              <div className="mb-2 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar firstName={comment.name} width={25} height={25}/>
                  <p className="font-heading font-semibold text-foreground">{comment.name}</p>
                </div>
                <span className="text-muted-foreground text-xs">{comment.date}</span>
              </div>
              <p className="text-sm text-foreground">{comment.text}</p>
            </div>
          ))}
        </div>
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