import React from "react";

export interface PageHolderProps {
  children: React.ReactNode,
  title: string,
  desc?: string,
  outerElement?: React.ReactNode
}