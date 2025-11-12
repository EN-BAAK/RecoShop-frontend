"use client";

import CustomButton from "@/components/forms/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-background p-6 min-h-screen flex items-center justify-center">
      <div className="text-center relative">

        <div className="border-2 border-danger/40 rounded-3xl absolute inset-0"></div>
        <div className="border-2 border-danger/20 rounded-3xl absolute -inset-2 blur-sm"></div>

        <span className="bg-danger/15 w-8 h-8 border border-danger/40 rounded-xl absolute -top-4 -left-4 rotate-12"></span>
        <span className="bg-danger/15 w-10 h-10 border border-danger/40 rounded-xl absolute -bottom-4 -right-4 -rotate-12"></span>

        <div className="bg-background/95 py-10 px-12 border border-muted rounded-3xl shadow-lg relative">
          <Image
            src="/not-found.png"
            width={350}
            height={200}
            alt="not-found"
          />

          <p className="mb-6 font-sans text-lg text-muted-foreground">
            This page is not exists
          </p>

          <Link
            href="/"
            
            passHref
          >
            <CustomButton
              label="Go back"
              variant="danger-outline"
              className="font-bold"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
