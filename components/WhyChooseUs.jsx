import { Shield, Award, Heart, HeadphonesIcon } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Market Leaders",
    desc: "Dubai's #1 luxury real estate agency for 5 consecutive years",
  },
  {
    icon: Shield,
    title: "100% Secure Transactions",
    desc: "Escrow-protected deals with full transparency",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    desc: "Your dream home is our mission – 98% client satisfaction rate",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Premium Support",
    desc: "Dedicated agent available anytime via call or WhatsApp",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose LuxuryEstate</h2>
          <p className="text-xl text-muted-foreground">Excellence is not an option – it's our standard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-6 group-hover:scale-110 transition">
                <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}