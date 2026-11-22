import React from 'react';

const WHATSAPP_URL =
  "https://wa.me/923066687519?text=Hi%20Hanan%2C%20I%20clicked%20Discover%20What%27s%20Coming%20on%20your%20portfolio!";

export const AnnouncementBanner: React.FC = () => {
  return (
    <div
      role="region"
      aria-label="Upcoming student project announcement"
      className="relative z-30 w-full m-0 p-0 pb-2 sm:pb-3 overflow-hidden bg-[#080D1B]"
    >
      <div className="relative w-full max-w-5xl mx-auto aspect-[4.55/1] overflow-hidden m-0 p-0">
        <img
          src="/assets/aistudio/image_1cb3b1f1.png"
          alt="New Project Currently in Development — A better way to stay on top of your studies"
          width={2048}
          height={768}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-[50%_46%] block select-none"
        />

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="btn-banner-discover-whatsapp"
          aria-label="Discover What's Coming — Redirect to Hanan Irfan on WhatsApp (+923066687519)"
          title="Chat on WhatsApp (+923066687519)"
          className="absolute left-[7.2%] top-[71.9%] w-[21.6%] h-[20.8%] rounded-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-[#60A5FA]/80 hover:shadow-[0_0_24px_rgba(59,130,246,0.55)] focus-visible:ring-2 focus-visible:ring-[#60A5FA] before:content-[''] before:absolute before:-inset-y-3 before:-inset-x-2 sm:before:inset-0"
        >
          <span className="sr-only">Discover What&apos;s Coming on WhatsApp (+923066687519)</span>
        </a>
      </div>
    </div>
  );
};
