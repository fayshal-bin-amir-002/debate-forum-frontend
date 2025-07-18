"use server";

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
