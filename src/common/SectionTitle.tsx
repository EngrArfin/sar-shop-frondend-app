interface ISectionTitleProp {
  title: string;
  description: string;
}

export default function SectionTitle({
  title,
  description,
}: ISectionTitleProp) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8 text-[#181E1C] dark:text-white font-['Faustina']">{title}</h2>
      <p className="text-lg text-[#5E6460] dark:text-gray-300 font-['Inter']">{description}</p>
    </div>
  );
}
