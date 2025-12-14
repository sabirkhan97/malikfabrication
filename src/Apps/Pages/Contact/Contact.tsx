import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import type { JSX } from "react";

export default function ContactPage() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Contact <span className="text-amber-500">Us</span>
          </h1>
          <p className="text-gray-400 mt-3">
            Get in touch for fabrication & welding services
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Info */}
          <div className="space-y-6 bg-gray-800 p-6 rounded-lg">

            <Info
              icon={<FiMapPin />}
              title="Address"
              text="663/25 Arjun Nagar, Street No. 8, Near Police Chowki, Gurugram, Haryana"
            />

            <Info
              icon={<FiPhone />}
              title="Phone"
              text="+91 7838170214, +91 8383928255, +91 9289377069"
            />

            <Info
              icon={<FiMail />}
              title="Email"
              text="info@mkfabrication.com, sales@mkfabrication.com"
            />

            <Info
              icon={<FiClock />}
              title="Working Hours"
              text="Mon – Sat: 8:00 AM – 6:00 PM"
            />

          </div>

          {/* Map */}
          <div className="h-80 lg:h-full rounded-lg overflow-hidden border border-gray-700">
      
                 <iframe
              width="100%"
              height="100%"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14012.566329!2d77.0188646!3d28.4580417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d194c86532c79%3A0x28811e37fa0d0a36!2sMalik%20Fabrication!5e0!3m2!1sen!2sin!4v1733740000000">
            </iframe>
          </div>

        </div>
      </div>
    </section>
  );
}

/* Reusable Info Row */
function Info({
  icon,
  title,
  text,
}: {
  icon: JSX.Element;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="text-amber-500 text-xl mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
}




       