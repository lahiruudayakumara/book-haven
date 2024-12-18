import { PageHeader } from "@/components/page-header";
import { ScreenContainer } from "@/components/screen-container";

export default function ContactUs() {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        description="Have questions or need assistance? Reach out to us directly, and we'll be happy to help you."
      />
      <ScreenContainer>
        <div className="flex flex-col items-center md:min-h-[27vh] dark:text-gray-200 justify-center space-y-4 py-8">
          <p className="font-bold">We had love to hear from you!</p>
          <p>
            If you have any inquiries feedback or need help with your orders
            please don not hesitate to reach out.
          </p>

          <div className="space-y-2 text-center">
            <p className="font-semibold">Email Us:</p>
            <a href="mailto:support@bookstore.com" className="text-blue-500">
              support@domain.com
            </a>
          </div>

          <div className="space-y-2 text-center">
            <p className="font-semibold">Call Us:</p>
            <p className="text-blue-500">+94 (123) 456-7891</p>
          </div>

          <div className="space-y-2 text-center">
            <p className="font-semibold">Follow Us:</p>
            <a href="#" className="text-blue-500">
              Twitter
            </a>{" "}
            |
            <a href="#" className="text-blue-500">
              Facebook
            </a>{" "}
            |
            <a href="#" className="text-blue-500">
              Instagram
            </a>
          </div>

          <p>
            If you are looking to get in touch with specific writers, feel free
            to browse their books or check back for direct contact options.
          </p>
        </div>
      </ScreenContainer>
    </div>
  );
}
