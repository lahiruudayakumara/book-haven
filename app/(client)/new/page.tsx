import BookViewArea from "@/components/book-view/book-view-area";
import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";
import { books } from "@/data/books";

export default function ContactUs() {
  return (
    <div>
      <PageHeader
        title="New Book Release"
        description="Learn about our latest book release, connect with the author, and get your copy today!"
      />
      <div className="flex flex-col items-center md:min-h-[27vh] justify-center space-y-4">
        <ScreenContainer>
          <div></div>
          {/* <BookViewArea book={books} title="" /> */}
        </ScreenContainer>
      </div>
    </div>
  );
}
