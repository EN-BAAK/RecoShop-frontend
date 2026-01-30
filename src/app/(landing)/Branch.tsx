"use client";

import React from "react";
import { handleCall, handleLocation } from "@/lib/helpers";
import { HeroBranchCardProps } from "@/types/components";
import { Phone, PhoneCall, Facebook, Instagram, } from "lucide-react";
import { cn } from "@/lib/utils";

const BranchCard: React.FC<HeroBranchCardProps> = ({ branch, side }) => {
  return (
    <div
      className={cn(
        "bg-background w-full md:w-[calc(50%-2rem)] p-5 border border-muted rounded-xl shadow-sm relative transition hover:shadow-md",
        side === "left"
          ? "md:float-left md:clear-right"
          : "md:float-right md:clear-left"
      )}
    >
      <span
        className={cn(
          "bg-background w-4 h-4 rounded-full border-4 border-emerald-600 hidden md:block absolute top-5",
          side === "left" ? "-right-10" : "-left-10"
        )}
      />

      <span
        className={cn(
          "w-0 h-0 border-[10px] border-transparent hidden md:block absolute top-5",
          side === "left"
            ? "border-l-[12px] border-l-muted -right-6"
            : "border-r-[12px] border-r-muted -left-6"
        )}
      />

      <h3 className="mb-1 font-sans font-semibold text-xl text-foreground">
        {branch.name}
      </h3>

      {branch.location && (
        <p className="mb-4 text-sm text-muted-foreground">
          {branch.location}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-sm">
        {branch.phone && (
          <button
            onClick={() => handleCall(branch.phone!)}
            className="flex items-center gap-1 text-green-600 cursor-pointer transition hover:text-green-800"
          >
            <Phone className="w-4 h-4" />
          </button>
        )}

        {branch.telephone && (
          <button
            onClick={() => handleCall(branch.telephone!)}
            className="flex items-center gap-1 text-sky-600 cursor-pointer transition hover:text-sky-800"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
        )}

        {branch.facebook && (
          <button
            onClick={() => handleLocation(branch.facebook)}
            className="text-blue-600 cursor-pointer transition hover:text-blue-800"
          >
            <Facebook className="w-4 h-4" />
          </button>
        )}

        {branch.instagram && (
          <button
            onClick={() => handleLocation(branch.instagram)}
            className="text-pink-600 cursor-pointer transition hover:text-pink-800"
          >
            <Instagram className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BranchCard;
