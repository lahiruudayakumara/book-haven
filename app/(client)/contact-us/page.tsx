import { PageHeader } from "@/components/page-header";

export default function ContactUs() {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        description="Have questions or need assistance? Reach out to us directly, and we'll be happy to help you."
      />
      <div className="flex flex-col items-center md:min-h-[27vh] text-gray-200 justify-center space-y-4">
        <p className="font-bold">We’d love to hear from you!</p>
        <p>If you have any inquiries, feedback, or need help with your orders, please don't hesitate to reach out.</p>

        <div className="space-y-2">
          <p className="font-semibold">Email Us:</p>
          <a href="mailto:support@bookstore.com" className="text-blue-500">support@bookstore.com</a>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Call Us:</p>
          <p className="text-blue-500">+1 (800) 123-4567</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Follow Us:</p>
          <a href="https://twitter.com/bookstore" className="text-blue-500">Twitter</a> | 
          <a href="https://facebook.com/bookstore" className="text-blue-500">Facebook</a> |
          <a href="https://instagram.com/bookstore" className="text-blue-500">Instagram</a>
        </div>

        <p>If you’re looking to get in touch with specific writers, feel free to browse their books or check back for direct contact options.</p>
      </div>
    </div>
  );
}
