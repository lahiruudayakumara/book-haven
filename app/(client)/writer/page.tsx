"use client";

import { Suspense, useEffect, useState } from "react";

import BookWriter from "@/components/book-view/book-writer";
import ErrorResponse from "@/types/error-response";
import { IBookWriter } from "@/types/book";
import Logger from "@/utils/logger";
import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";
import SkeletonAvatar from "@/components/skelton/skelton-avatar";
import getWriters from "@/lib/api-requests/book/get-writers";

export default function Writer() {
  const [writers, setWriters] = useState<IBookWriter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWriterDetails = async (): Promise<
      IBookWriter | ErrorResponse
    > => {
      setIsLoading(true);
      try {
        const response = await getWriters();
        return response;
      } catch (error) {
        Logger.error("Error fetching writers:", error);
        return { error: "Error fetching writers" };
      }
    };
    fetchWriterDetails().then((r) => {
      if ("error" in r) {
        Logger.error(r.error);
        return;
      }

      setWriters(
        r.writers.map((writer: IBookWriter) => ({
          _id: writer.id,
          name: writer.writer,
        }))
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader
        title="Writer Dashboard"
        description="Discover the talented writers behind your favorite books. Explore their works, learn about their journeys, and find your next great read."
      />
      <div className="flex flex-col items-center md:min-h-[27vh] justify-center space-y-4">
        <ScreenContainer>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-3 md:gap-4 py-6">
                {[...Array(8)].map((_, i) => (
                  <SkeletonAvatar key={i} />
                ))}
              </div>
            }
          >
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-3 md:gap-4 py-6">
                {[...Array(12)].map((_, i) => (
                  <SkeletonAvatar key={i} />
                ))}
              </div>
            ) : writers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-3 md:gap-4 py-6">
                {writers.map((writers) => (
                  <BookWriter key={writers._id} writer={writers} />
                ))}
              </div>
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 h-auto my-auto text-center w-full">
                No wriers found
              </div>
            )}
          </Suspense>
        </ScreenContainer>
      </div>
    </div>
  );
}
