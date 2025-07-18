"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getAllDebates = async (query: URLSearchParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/debates?${query}`,
      {
        next: {
          tags: ["Debates"],
          revalidate: 60,
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createDebate = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/debates/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    revalidateTag("Debates");

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
