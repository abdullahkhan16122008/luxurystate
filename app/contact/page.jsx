"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  let api = process.env.NEXT_PUBLIC_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Save lead to localStorage
  // const existingLeads = JSON.parse(localStorage.getItem("luxuryLeads") || "[]");
  // const newLead = {
  //   id: Date.now(),
  //   ...formData,
  //   date: new Date().toISOString(),
  //   status: "New"
  // };
  // existingLeads.push(newLead);
  // localStorage.setItem("luxuryLeads", JSON.stringify(existingLeads));

  try {

    let response = await axios.post(`${api}/api/contact`, {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      message: formData.message
    })

    if (response.data.success === true) {
      toast.success(response.data.message);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else if(response.data.success === false) {
      toast.error(response.data.message);
    }
  } catch (err) {
    toast.error(`Internal Server Issue`)
  }

};
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556742111-a301076d9d41?w=2000&q=80')"}}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Get In Touch</h1>
          <p className="text-2xl">Our team is available 24/7 via call or WhatsApp</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-bold mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone / WhatsApp</Label>
                  <Input
                    id="phone"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="I'm interested in properties in Palm Jumeirah..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-lg">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info + Map */}
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-bold mb-10">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">Call or WhatsApp</p>
                      <p className="text-2xl font-bold">+971 4 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">WhatsApp Direct</p>
                      <a href="https://wa.me/971501234567" className="text-2xl font-bold text-green-600 hover:underline">Click to Chat</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">Email Us</p>
                      <p className="text-2xl font-bold">info@luxuryestate.ae</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">Visit Our Office</p>
                      <p className="text-xl font-bold">Office 3201, Burj Al Salam Tower<br/>Sheikh Zayed Road, Dubai</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3059472086855!2d55.276545!3d25.188945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4340c7f3ae6b%3A0x5e4b61e9b3a3e6b8!2sBurj%20Al%20Salam%20Tower!5e0!3m2!1sen!2sae!4v1729193642015!5m2!1sen!2sae"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "20px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}