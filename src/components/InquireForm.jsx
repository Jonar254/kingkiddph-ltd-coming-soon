"use client";

import React, { useState } from "react";
import { inquireSection } from "../mock/mock";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const InquireForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formElement = e.target;
    const submission = new FormData(formElement);
    if (!WEB3FORMS_ACCESS_KEY) {
      throw new Error("Missing Web3Forms access key");
    }

    submission.append("access_key", WEB3FORMS_ACCESS_KEY);
    submission.append(
      "subject",
      "New inquiry submitted via Form & Finish website"
    );
    const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();
    submission.append("from_name", fullName || "Form & Finish Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submission,
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Unable to submit form");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
      setFormData({});
      formElement.reset();
    } catch (err) {
      setError(
        "We couldn't send your brief. Please refresh and try again or email hello@formandfinish.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquire" className="bg-stone py-24 md:py-32 px-6 md:px-12 text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
        <div>
          <p className="font-serif-display text-4xl md:text-5xl text-black leading-[1.15] mb-6 whitespace-pre-line">
            {"Tell us about\nyour project."}
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-black tracking-wider max-w-md">
            We are currently accepting select project briefs. Share the details below and we will be in touch within 24 hours .
          </p>
          <div className="mt-12 pt-10 border-t border-[#c8bfb3]">
            <p className="text-sm md:text-base text-black leading-[1.8]">
              <span className="font-semibold">Currently sourcing from China.</span>
              <br />
              Live access to factory-direct pricing on tiles, flooring, hardware, wall systems, doors, lighting and more. Submit your brief now and we will source with your project in mind.
            </p>
          </div>
          {/*
          <div className="mt-10 bg-[#b08d57] text-white rounded-3xl px-8 py-10 shadow-lg">
            <div className="flex flex-col gap-8 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] mb-2 opacity-80">Call Us</p>
                <p className="text-2xl md:text-3xl font-semibold tracking-wide">
                  0739 090 444
                </p>
              </div>
              <div className="h-px bg-white/30 mx-auto w-20" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] mb-2 opacity-80">Email</p>
                <p className="text-lg md:text-xl font-medium break-words">
                  formandfinishsourcing@gmail.com
                </p>
              </div>
              <div className="h-px bg-white/30 mx-auto w-20" />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] mb-2 opacity-80">Location</p>
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  Apic Center, 1st Floor
                  <br />
                  Westlands, Nairobi
                </p>
              </div>
            </div>
          </div>
          */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First name"
                className="form-input"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last name"
                className="form-input"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@email.com"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="whatsapp">
              WhatsApp number
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              placeholder="+254 7XX XXX XXX"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="projectType">
              Project type
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              className="form-input"
              defaultValue=""
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your project type
              </option>
              <option>New build</option>
              <option>Renovation</option>
              <option>Fit-out</option>
              <option>Furnishing only</option>
              <option>Developer project</option>
              <option>Hospitality / Airbnb</option>
            </select>
          </div>

          <div>
            <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="categories">
              Categories you need
            </label>
            <select
              id="categories"
              name="categories"
              className="form-input"
              defaultValue=""
              onChange={handleChange}
            >
              <option value="" disabled>
                Primary category of interest
              </option>
              <option>Tiles &amp; surfaces</option>
              <option>Flooring</option>
              <option>Cabinetry hardware</option>
              <option>Wall cladding &amp; panels</option>
              <option>Doors &amp; partitions</option>
              <option>Lighting</option>
              <option>Furniture</option>
              <option>Sanitaryware &amp; bathrooms</option>
              <option>Whole house — multiple categories</option>
            </select>
          </div>

          <div>
            <label className="form-label text-black text-sm md:text-base font-semibold" htmlFor="message">
              Tell us about your project
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Location, number of rooms or sqm, style preference, timeline. Anything that helps us understand your project."
              className="form-input"
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 pt-2">{error}</p>
          )}

          {submitted ? (
            <p className="font-serif-display italic text-2xl text-[#3d3935] pt-4">
              {inquireSection.successMessage}
            </p>
          ) : (
            <button
              type="submit"
              className="btn-line mt-4 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Submit Form →"}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default InquireForm;
