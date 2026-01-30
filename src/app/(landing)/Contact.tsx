'use client';

import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Card } from '@/components/ui/card';
import { usePostMessage } from '@/hooks/useMessage';
import SectionHolder from './SectionHolder';
import { MessageCreation } from '@/types/global';
import { message as initialValues } from "@/constants/formValues"
import { postMessage as postMessageValidation } from "@/constants/formValidation"
import InputField from '@/components/forms/InputField';
import TextAreaField from '@/components/forms/TextAreaField';
import SubmitButton from '@/components/forms/SubmitButton';
import Image from 'next/image';

const Contact: React.FC = () => {
  const { mutateAsync: postMessage } = usePostMessage();

  const handleSubmit = async (values: MessageCreation, formik: FormikHelpers<MessageCreation>) => {
    await postMessage(values);
    formik.resetForm();
    formik.setSubmitting(false)
  };

  return (
    <SectionHolder title="Get in Touch" desc="Have a question or feedback? We'd love to hear from you.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6 flex flex-col justify-center">
          <div>
            <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
              We are here to help
            </h3>

            <p className="leading-relaxed text-foreground/70">
              Whether you have a question about products, orders, or anything
              else, our team is ready to assist you. Fill out the form and
              we will get back to you as soon as possible.
            </p>
          </div>

          <div className="lg:flex items-center gap-3 ">
            <Image
              src="/contact.png"
              className='w-80 h-80'
              alt='contact-img'
              loading='lazy'
              width={50}
              height={50}
            />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 w-6 h-6 0 mt-1 flex items-center justify-center flex-shrink-0 rounded-full">
                  <div className="bg-primary w-2 h-2 rounded-full" />
                </div>

                <div>
                  <h4 className="font-semibold text-foreground">Quick Response</h4>
                  <p className="text-sm text-foreground/60">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/20 w-6 h-6 0 mt-1 flex items-center justify-center flex-shrink-0 rounded-full">
                  <div className="bg-primary w-2 h-2 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Expert Support</h4>
                  <p className="text-sm text-foreground/60">
                    Our knowledgeable team is ready to assist
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/20 w-6 h-6 0 mt-1 flex items-center justify-center flex-shrink-0 rounded-full">
                  <div className="bg-primary w-2 h-2 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">24/7 Available</h4>
                  <p className="text-sm text-foreground/60">
                    Send your message anytime, day or night
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-background p-6 sm:p-8 border border-muted shadow-sm transition-shadow duration-300 hover:shadow-md">
          <Formik initialValues={initialValues} validationSchema={postMessageValidation} onSubmit={handleSubmit}>
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    name="username"
                    label="Name"
                    type="text"
                    placeholder="Your name (optional)"
                  />

                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <InputField
                  name="phone"
                  label="Phone"
                  type="text"
                  placeholder="Your phone number (optional)"
                />

                <InputField
                  name="subject"
                  label="Subject"
                  type="text"
                  placeholder="What is this about? (optional)"
                />

                <TextAreaField
                  name="msg"
                  label="Message"
                  placeholder="Tell us more... (minimum 10 characters)"
                  required
                />

                <SubmitButton label='Send' isDirty={dirty} isSubmitting={isSubmitting} isValid={isValid} />

                <p className="text-center text-xs text-foreground/50">
                  We respect your privacy. Your message is secure.
                </p>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </SectionHolder>
  );
}

export default Contact;