import BookWriter from "@/components/book-view/book-writer";
import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";
import { write } from "fs";

const data = [
  { id: "1", name: "Jone" },
  { id: "2", name: "Alice" },
  { id: "3", name: "Bob" },
  { id: "4", name: "Charlie" },
  { id: "5", name: "David" },
  { id: "6", name: "Eve" },
  { id: "7", name: "Frank" },
  { id: "8", name: "Grace" },
  { id: "9", name: "Hank" },
  { id: "10", name: "Ivy" },
];

export default function Writer() {
  return (
    <div>
      <PageHeader
        title="Writer Dashboard"
        description="Discover the talented writers behind your favorite books. Explore their works, learn about their journeys, and find your next great read."
      />
      <div className="flex flex-col items-center md:min-h-[27vh] justify-center space-y-4">
        <ScreenContainer>
          <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-6 gap-3 md:gap-4 py-6">
            {data.map((data) => (
                <BookWriter key={data.id} writer={data} />
            ))}
          </div>
        </ScreenContainer>
      </div>
    </div>
  );
}
