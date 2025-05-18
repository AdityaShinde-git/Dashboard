import { useState } from "react";

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "To reset your password, click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
  },
  {
    question: "What are your support hours?",
    answer: "Our support team is available Monday to Friday, 9 AM to 6 PM (your local time).",
  },
  {
    question: "How do I report a technical issue?",
    answer: "You can report issues via the live chat or by filling out the feedback form below.",
  },
  {
    question: "Where can I find your privacy policy?",
    answer: "Our privacy policy is available at the footer of every page or by clicking here [link].",
  },
];

export default function HelplinePage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { from: "agent", text: "Hi! How can I assist you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedbackErrors, setFeedbackErrors] = useState({});
  const [feedbackSent, setFeedbackSent] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaqIndex(index === activeFaqIndex ? null : index);
  };

  // Simulate agent reply after user sends a chat message
  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { from: "user", text: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { from: "agent", text: "Thank you for your message! We'll get back to you shortly." },
      ]);
    }, 1500);
  };

  const handleFeedbackChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const validateFeedback = () => {
    const errors = {};
    if (!feedback.name.trim()) errors.name = "Name is required";
    if (!feedback.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(feedback.email))
      errors.email = "Email is invalid";
    if (!feedback.message.trim()) errors.message = "Message is required";
    setFeedbackErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!validateFeedback()) return;
    // Simulate sending feedback
    setFeedbackSent(true);
    setFeedback({ name: "", email: "", message: "" });
    setTimeout(() => setFeedbackSent(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Helpline & Support Center</h1>
        <p className="text-lg text-muted-foreground">
          We're here to help. Find answers, contact us, or chat live with our support team.
        </p>
      </header>

      {/* Contact Info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-lg shadow hover:shadow-lg  hover:bg-blue-200  hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">Phone Support</h2>
          <p className="text-3xl font-bold text-blue-600">+91 9876543217</p>
          <p className="text-muted-foreground mt-1">Mon - Fri, 9am - 6pm</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg  hover:bg-blue-200  hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">Email Support</h2>
          <p className="text-blue-600">asgnmthelp@example.com</p>
          <p className="text-muted-foreground mt-1">We reply within 24 hours</p>
        </div>
        <div className="p-6 border rounded-lg shadow hover:shadow-lg  hover:bg-blue-200  hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-2">Office Address</h2>
          <address className="not-italic">
            123 Ishwar buliding<br />
            Bhagwan bharose Marg, 4000008<br />
            MAHARASHTRA
          </address>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg shadow-sm">
              <button
                onClick={() => toggleFaq(i)}
                aria-expanded={activeFaqIndex === i}
                className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-lg focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
              >
                <span>{faq.question}</span>
                <span className="text-2xl font-bold">
                  {activeFaqIndex === i ? "−" : "+"}
                </span>
              </button>
              {activeFaqIndex === i && (
                <div className="px-6 py-4 border-t text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Live Chat */}
      <section className="max-w-4xl mx-auto border rounded-lg shadow p-6 flex flex-col h-[400px]">
        <h2 className="text-3xl font-bold mb-4">Live Chat Support</h2>
        <div
          className="flex-1 overflow-y-auto mb-4 p-4 border rounded bg-gray-50"
          aria-live="polite"
        >
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 max-w-xs px-4 py-2 rounded-lg ${
                msg.from === "agent"
                  ? "bg-blue-100 text-blue-800 self-start"
                  : "bg-green-100 text-green-800 self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            aria-label="Type your message"
            placeholder="Type your message..."
            className="flex-grow rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            disabled={!chatInput.trim()}
          >
            Send
          </button>
        </form>
      </section>

      {/* Feedback Form */}
      <section className="max-w-3xl mx-auto border rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Send Us Feedback</h2>
        {feedbackSent && (
          <div className="mb-4 text-green-700 bg-green-100 px-4 py-3 rounded">
            Thank you for your feedback! We appreciate you reaching out.
          </div>
        )}
        <form onSubmit={handleFeedbackSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={feedback.name}
              onChange={handleFeedbackChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none ${
                feedbackErrors.name
                  ? "border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              aria-describedby="name-error"
            />
            {feedbackErrors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {feedbackErrors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={feedback.email}
              onChange={handleFeedbackChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none ${
                feedbackErrors.email
                  ? "border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              aria-describedby="email-error"
            />
            {feedbackErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {feedbackErrors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block mb-1 font-semibold">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={feedback.message}
              onChange={handleFeedbackChange}
              className={`w-full rounded border px-3 py-2 focus:outline-none resize-y ${
                feedbackErrors.message
                  ? "border-red-600 focus:ring-red-600"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              aria-describedby="message-error"
            />
            {feedbackErrors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {feedbackErrors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </section>
    </div>
  );
}
