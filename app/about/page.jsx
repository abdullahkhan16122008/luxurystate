import { Shield, Award, Users, HeadphonesIcon, Globe, Home, Heart } from "lucide-react";

export const metadata = {
  title: "About Us - LuxuryEstate Dubai",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Dubai's Most Trusted<br/>Luxury Real Estate Agency</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">Over AED 5.2 Billion in sales | 500+ happy families | 12 years of excellence</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <div className="text-5xl font-bold">AED 5.2B+</div>
            <p className="text-blue-100 mt-2">Total Sales Volume</p>
          </div>
          <div>
            <div className="text-5xl font-bold">500+</div>
            <p className="text-blue-100 mt-2">Happy Clients</p>
          </div>
          <div>
            <div className="text-5xl font-bold">12</div>
            <p className="text-blue-100 mt-2">Years of Excellence</p>
          </div>
          <div>
            <div className="text-5xl font-bold">#1</div>
            <p className="text-blue-100 mt-2">Luxury Agency in Dubai</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 max-w-6xl">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-600">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To deliver extraordinary real estate experiences by combining unmatched market knowledge, 
              discretion, and personalized service — helping our clients find not just a property, 
              but their ultimate lifestyle in Dubai.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-600">Our Vision</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To remain Dubai's most respected and referred luxury real estate brand, 
              setting the global standard for integrity, innovation, and client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">Integrity</h3>
              <p className="text-gray-600">Transparency and trust in every transaction</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">Excellence</h3>
              <p className="text-gray-600">We accept nothing less than the absolute best</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">Client First</h3>
              <p className="text-gray-600">Your dream is our mission — always</p>
            </div>
          </div>
        </div>
      </section>


      {/* Team Teaser */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Meet Our Expert Team</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Multilingual specialists with over 100+ years of combined experience in Dubai luxury real estate
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {["Sarah Al Maktoum", "James Williams", "Olga Petrova", "Ahmed Khan"].map((name, i) => (
              <div key={i} className="space-y-4">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-blue-600">
                  <img src={`https://randomuser.me/api/portraits/${i%2===0 ? 'women' : 'men'}/${i*10 + 5}.jpg`} alt={name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">{name}</h4>
                <p className="text-gray-600">Senior Property Consultant</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}