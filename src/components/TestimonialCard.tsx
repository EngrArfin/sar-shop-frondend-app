// components/TestimonialCard.jsx
import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }: any) => {
  const { name, role, avatar, message, rating, grayscale } = testimonial;

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-xs bg-surface-card dark:bg-[#121622] max-w-md mx-auto h-full">
      <p className="text-gray-700 dark:text-gray-300 mb-4 font-['Inter']">"{message}"</p>
      <div className="flex items-center space-x-1 mb-3 text-amber-500">
        {Array.from({ length: rating }, (_, i) => (
          <Star key={i} size={18} fill="currentColor" />
        ))}
      </div>
      <div className="flex items-center space-x-3 mt-4">
        <img
          src={avatar}
          alt={name}
          className={`w-10 h-10 rounded-full object-cover ${
            grayscale ? "grayscale" : ""
          }`}
        />
        <div>
          <h4 className="text-sm font-semibold text-accent font-['Faustina']">{name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
