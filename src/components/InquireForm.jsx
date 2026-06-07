"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { inquireSection } from "../mock/mock";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  jobLocation: "",
  shootDate: "",
  message: "",
};

const serviceOptions = [
  "Branding",
  "Consultation",
  "Corporate Event",
  "Documentary",
  "Drone Coverage",
  "Wedding",
  "Other",
];

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const DarkDatePicker = ({ value, onChange, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const normalizedToday = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const selectedDate = useMemo(() => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  }, [value]);

  const initialMonth = useMemo(() => {
    if (selectedDate) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }, [selectedDate]);

  const [displayMonth, setDisplayMonth] = useState(initialMonth);

  useEffect(() => {
    setDisplayMonth(initialMonth);
  }, [initialMonth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const buildMonthGrid = useMemo(() => {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: startDay }, () => null);
    for (let day = 1; day <= lastDay; day += 1) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [displayMonth]);

  const formattedValue = selectedDate
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(selectedDate)
    : "Select date";

  const handleDateSelect = (date) => {
    const isoString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate(),
    ).padStart(2, "0")}`;
    onChange(isoString);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className={`${inputClass} flex w-full items-center justify-between border border-white/15 px-4 py-3 text-left`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <span
          className={`truncate text-white ${selectedDate ? "font-medium" : "font-normal"}`}
        >
          {formattedValue}
        </span>
        <ChevronDown
          className={`ml-3 h-5 w-5 text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-30 mt-2 w-full border border-white/10 bg-black/95 p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setDisplayMonth(
                  (prev) =>
                    new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                )
              }
              className="rounded-md border border-white/10 p-2 text-white transition-colors hover:bg-white/10"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(displayMonth)}
            </span>
            <button
              type="button"
              onClick={() =>
                setDisplayMonth(
                  (prev) =>
                    new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                )
              }
              className="rounded-md border border-white/10 p-2 text-white transition-colors hover:bg-white/10"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] uppercase tracking-[0.2em] text-white font-medium">
            {weekdayLabels.map((label) => (
              <span key={label} className="py-2">
                {label}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {buildMonthGrid.map((day, index) => {
              if (!day) {
                return <span key={`empty-${index}`} className="aspect-square" />;
              }

              const isPast = day < normalizedToday;
              const isSelected = selectedDate && day.getTime() === selectedDate.getTime();
              const isToday = day.getTime() === normalizedToday.getTime();

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => !isPast && handleDateSelect(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-md text-[0.8rem] transition-colors ${
                    isSelected
                      ? "bg-[#FF9500] text-black font-semibold"
                      : isPast
                      ? "text-white cursor-not-allowed"
                      : "text-white hover:bg-white/10"
                  } ${isToday && !isSelected ? "border border-[#FF9500]/40" : ""}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <input type="hidden" name="shootDate" value={value} required={required} />
    </div>
  );
};

const contactChannels = [
  {
    label: "Call us",
    value: "+254-768-703-725",
    href: "tel:+254768703725",
  },
  {
    label: "Email",
    value: "admin@kingkiddphltd.co.ke",
    href: "mailto:admin@kingkiddphltd.co.ke",
  },
  {
    label: "WhatsApp",
    value: "+254-768-703-725",
    href: "https://wa.me/+254768703725",
  },
  {
    label: "Instagram",
    value: "@_kingkiddphproduction",
    href: "https://www.instagram.com/_kingkiddproduction/",
  },
  {
    label: "YouTube",
    value: "Kingkiddph Ltd",
    href: "https://youtube.com/@kingkiddphltd?si=9x0J9nqNlln3ZDc8",
  },
];

const fieldWrapperClass = "border-b border-white/15 py-5";
const labelClass = "block text-[11px] uppercase tracking-[0.28em] text-white font-semibold mb-2";
const inputClass = "w-full bg-transparent text-white text-base font-medium placeholder:text-white focus:outline-none caret-[#FF9500]";

const DEFAULT_COUNTRY = {
  name: "Kenya",
  code: "+254",
  flag: "🇰🇪",
  cca2: "KE",
};

const InquireForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryOptions, setCountryOptions] = useState([DEFAULT_COUNTRY]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    DEFAULT_COUNTRY.cca2,
  );
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [serviceHighlightIndex, setServiceHighlightIndex] = useState(-1);
  const serviceDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,flag,idd",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const payload = await response.json();
        const mapped = payload
          .map((country) => {
            const root = country.idd?.root ?? "";
            const suffix = country.idd?.suffixes?.[0] ?? "";
            const dialCode = `${root}${suffix}`;
            if (!dialCode) return null;
            return {
              name: country.name?.common ?? country.name?.official ?? "",
              code: dialCode,
              flag: country.flag ?? "",
              cca2: country.cca2 ?? country.name?.common ?? dialCode,
            };
          })
          .filter((item) => item && item.name && item.code);

        const uniqueByCca2 = Array.from(
          new Map(mapped.map((item) => [item.cca2, item])).values(),
        ).sort((a, b) => a.name.localeCompare(b.name));

        if (uniqueByCca2.length) {
          setCountryOptions(uniqueByCca2);
          const kenya = uniqueByCca2.find((country) => country.cca2 === "KE");
          if (kenya) {
            setSelectedCountryCode(kenya.cca2);
          }
        }
      } catch (countryError) {
        console.error("Unable to load country list", countryError);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const selectedCountry = useMemo(
    () =>
      countryOptions.find((country) => country.cca2 === selectedCountryCode) ??
      DEFAULT_COUNTRY,
    [countryOptions, selectedCountryCode],
  );

  const handleServiceSelect = (option) => {
    setFormData((prev) => ({ ...prev, service: option }));
    setServiceMenuOpen(false);
    setServiceHighlightIndex(-1);
    setError("");
  };

  useEffect(() => {
    if (serviceMenuOpen) {
      const currentIndex = serviceOptions.findIndex(
        (option) => option === formData.service,
      );
      setServiceHighlightIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [serviceMenuOpen, formData.service]);

  useEffect(() => {
    if (!serviceMenuOpen && !countryDropdownOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target)
      ) {
        setServiceMenuOpen(false);
        setServiceHighlightIndex(-1);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [serviceMenuOpen, countryDropdownOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!formData.service) {
      setError("Please choose a service before submitting your inquiry.");
      setIsSubmitting(false);
      setServiceMenuOpen(false);
      return;
    }

    const formElement = e.target;
    const submission = new FormData(formElement);
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error("Missing Web3Forms access key. Check NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.");
      setError(
        "Form is temporarily unavailable. Please email hello@kingkiddph.com while we resolve this.",
      );
      setIsSubmitting(false);
      return;
    }

    submission.append("access_key", WEB3FORMS_ACCESS_KEY);
    submission.append(
      "subject",
      "New inquiry submitted via Kingkiddph Ltd website"
    );
    const fromName = formData.name.trim();
    submission.append("from_name", fromName || "Kingkiddph Ltd Website");
    submission.set(
      "phone",
      `${selectedCountry.code} ${formData.phone}`.replace(/\s+/g, ""),
    );
    submission.set("dial_code", selectedCountry.code);
    submission.set("country", selectedCountry.name);

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
      setTimeout(() => setSubmitted(false), 4500);
      setFormData(initialFormState);
      setSelectedCountryCode(DEFAULT_COUNTRY.cca2);
      setServiceMenuOpen(false);
      setServiceHighlightIndex(-1);
      setCountryDropdownOpen(false);
      formElement.reset();
    } catch (err) {
      setError(
        "We couldn't send your brief. Please refresh and try again or email hello@kingkiddph.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquire" className="bg-black text-white py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid gap-14 lg:gap-20 lg:grid-cols-12">
          <div className="order-1 lg:order-1 lg:col-span-5 flex flex-col gap-12">
            <div className="space-y-6">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#FF9500]">General Inquiries</p>
              <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.05] text-white">
                Tell us about your production.
              </h2>
              <div className="space-y-3 text-white">
                
                <p className="text-sm md:text-base leading-relaxed text-white font-medium">
                  At Kingkiddph Ltd, we integrate video production, photography, digital strategy, and innovative design to elevate your brand. Contact to enhance your reach.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm uppercase tracking-[0.25em] text-white font-semibold">
              {contactChannels.map((channel) => (
                <div key={channel.label} className="flex flex-col gap-1">
                  <span>{channel.label}</span>
                  <a
                    href={channel.href}
                    className="text-white normal-case tracking-normal text-base font-medium hover:text-[#FF9500] transition-colors"
                  >
                    {channel.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="order-2 lg:order-2 lg:col-span-7">
            <div className="border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 md:p-10 shadow-[0_45px_120px_rgba(0,0,0,0.45)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#FF9500] mb-6">
                <span className="relative inline-flex items-center gap-2">
                  <span className="h-[1px] w-6 bg-[#FF9500]/40" />
                  Contact Form
                </span>
              </p>

              {submitted ? (
                <div className="flex flex-col items-start gap-5 py-12 md:py-16 text-white">
                  <div className="w-16 h-16 rounded-full bg-[#FF9500] flex items-center justify-center">
                    <Check className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="font-serif-display text-3xl">Thank you!</h3>
                  <p className="text-white text-base font-medium max-w-md leading-relaxed">
                    Your submission has been received. A member of our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className={fieldWrapperClass}>
                    <label className={labelClass} htmlFor="name">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputClass} text-lg`}
                    />
                  </div>

                  <div className={fieldWrapperClass}>
                    <label className={labelClass} htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,220px)_1fr] md:gap-5">
                    <div className={`${fieldWrapperClass} relative`}>
                      <label className={labelClass} htmlFor="country">
                        Country
                      </label>
                      <div className="relative" ref={countryDropdownRef}>
                        <button
                          type="button"
                          id="country"
                          aria-haspopup="listbox"
                          aria-expanded={countryDropdownOpen}
                          onClick={() => setCountryDropdownOpen((prev) => !prev)}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              setCountryDropdownOpen(false);
                            }
                            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setCountryDropdownOpen(true);
                            }
                          }}
                          className={`${inputClass} flex items-center justify-between border border-white/15 px-4 py-3 text-left`}
                        >
                          <span className="truncate">
                            {`${selectedCountry.flag ?? ""} ${selectedCountry.name} (${selectedCountry.code})`}
                          </span>
                          <ChevronDown
                            className={`ml-3 h-5 w-5 text-white transition-transform ${
                              countryDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {countryDropdownOpen && (
                          <div className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto border border-white/10 bg-black/90 backdrop-blur-lg shadow-lg">
                            {countryOptions.map((country) => (
                              <button
                                key={country.cca2}
                                type="button"
                                onClick={() => {
                                  setSelectedCountryCode(country.cca2);
                                  setCountryDropdownOpen(false);
                                }}
                                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm uppercase tracking-[0.18em] transition-colors ${
                                  country.cca2 === selectedCountryCode
                                    ? "bg-[#FF9500]/20 text-[#FF9500]"
                                    : "text-white hover:bg-white/10"
                                }`}
                              >
                                <span className="truncate">
                                  {`${country.flag ?? ""} ${country.name}`}
                                </span>
                                <span className="text-xs text-white font-semibold">
                                  {country.code}
                                </span>
                              </button>
                            ))}
                            {isLoadingCountries && (
                              <div className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-white font-medium">
                                Loading...
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <input type="hidden" name="country" value={selectedCountryCode} />
                    </div>
                    <div className={fieldWrapperClass}>
                      <label className={labelClass} htmlFor="phone">
                        Phone number
                      </label>
                      <div className="flex items-center gap-3">
                        <span className="text-sm uppercase tracking-[0.2em] text-[#FF9500]">
                          {selectedCountry.code}
                        </span>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="7XX XXX XXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`${inputClass} flex-1`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`${fieldWrapperClass} relative`}>
                    <label className={labelClass} htmlFor="service">
                      Which service are you looking for?
                    </label>
                    <div
                      ref={serviceDropdownRef}
                      className="relative"
                    >
                      <button
                        type="button"
                        id="service"
                        aria-haspopup="listbox"
                        aria-expanded={serviceMenuOpen}
                        onClick={() => setServiceMenuOpen((prev) => !prev)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                            event.preventDefault();
                            setServiceMenuOpen(true);
                            setServiceHighlightIndex((prev) => {
                              const direction = event.key === "ArrowDown" ? 1 : -1;
                              const nextIndex = prev + direction;
                              if (nextIndex < 0) return serviceOptions.length - 1;
                              if (nextIndex >= serviceOptions.length) return 0;
                              return nextIndex;
                            });
                          }
                          if (event.key === "Enter" && serviceMenuOpen) {
                            event.preventDefault();
                            if (serviceHighlightIndex >= 0) {
                              handleServiceSelect(serviceOptions[serviceHighlightIndex]);
                            }
                          }
                          if (event.key === "Escape") {
                            setServiceMenuOpen(false);
                            setServiceHighlightIndex(-1);
                          }
                        }}
                        className={`${inputClass} flex items-center justify-between border border-white/15 px-4 py-3 text-left`}
                      >
                        <span className="truncate">
                          {formData.service || "Choose service*"}
                        </span>
                        <ChevronDown
                          className={`ml-3 h-5 w-5 text-white transition-transform ${
                            serviceMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {serviceMenuOpen && (
                        <ul
                          role="listbox"
                          className="absolute z-30 mt-2 w-full border border-white/10 bg-black/90 backdrop-blur-lg shadow-lg"
                        >
                          {serviceOptions.map((option, index) => {
                            const isSelected = option === formData.service;
                            const isActive = index === serviceHighlightIndex;
                            return (
                              <li
                                key={option}
                                role="option"
                                aria-selected={isSelected}
                                onMouseEnter={() => setServiceHighlightIndex(index)}
                                onMouseLeave={() => setServiceHighlightIndex(-1)}
                                onClick={() => handleServiceSelect(option)}
                                className={`px-4 py-3 text-sm uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                                  isActive
                                    ? "bg-white/15 text-white"
                                    : isSelected
                                    ? "bg-[#FF9500]/20 text-[#FF9500]"
                                    : "text-white hover:bg-white/10"
                                }`}
                              >
                                {option}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <input type="hidden" name="service" value={formData.service} />
                  </div>

                  <div className={fieldWrapperClass}>
                    <label className={labelClass} htmlFor="jobLocation">
                      Job location
                    </label>
                    <input
                      id="jobLocation"
                      name="jobLocation"
                      type="text"
                      required
                      placeholder="e.g. Nairobi, Kenya"
                      value={formData.jobLocation}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className={fieldWrapperClass}>
                    <label className={labelClass} htmlFor="shootDate">
                      Main shoot date
                    </label>
                    <DarkDatePicker
                      value={formData.shootDate}
                      onChange={(newDate) =>
                        setFormData((prev) => ({ ...prev, shootDate: newDate }))
                      }
                      required
                    />
                  </div>

                  <div className={`${fieldWrapperClass} pb-0`}> 
                    <label className={labelClass} htmlFor="message">
                      Enter your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Briefly describe what you are looking for."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none leading-relaxed bg-transparent`}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-[#FF6666] pt-2">{error}</p>
                  )}

                  <div className="pt-8">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 rounded-none bg-[#FF9500] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition-all hover:bg-[#FFAA33] disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? "Sending…" : "Submit"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquireForm;
