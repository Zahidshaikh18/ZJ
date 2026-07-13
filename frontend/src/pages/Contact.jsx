import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import { Reveal } from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { COMPANY, SERVICES } from "@/lib/company";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const schema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (min 10 characters)"),
});

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { service: "" } });
  const serviceValue = watch("service");

  async function onSubmit(data) {
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad");
      setSuccess(true);
      reset();
      toast.success("Message received. We'll be in touch within one business day.");
      setTimeout(() => setSuccess(false), 6000);
    } catch (e) {
      toast.error("Something went wrong — please email us directly.");
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-[hsl(214_60%_9%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-32">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[hsl(191_100%_70%)]">Contact</span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
              Let's start a conversation.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70 leading-relaxed">
              Tell us what you're working on. A senior engineer or partner will respond within one business day — no auto-responders.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
          {/* LEFT: Contact info */}
          <div className="space-y-6">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-display text-xl font-semibold">Reach us directly</h3>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Office</div>
                      <div className="mt-1">{COMPANY.address.line1}<br />{COMPANY.address.line2}<br />{COMPANY.address.state} {COMPANY.address.pincode}</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                      <a href={`tel:${COMPANY.phone}`} data-testid="contact-phone-link" className="mt-1 block hover:text-primary">{COMPANY.phone}</a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                      <a href={`mailto:${COMPANY.email}`} data-testid="contact-email-link" className="mt-1 block hover:text-primary">{COMPANY.email}</a>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  <a href={`tel:${COMPANY.phone}`} data-testid="contact-call-btn" className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background py-3 text-xs font-medium hover:border-primary hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a href={`mailto:${COMPANY.email}`} data-testid="contact-email-btn" className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background py-3 text-xs font-medium hover:border-primary hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <a href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-btn" className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background py-3 text-xs font-medium hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                    <FaWhatsapp className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border overflow-hidden h-64 relative bg-secondary">
                <iframe
                  title="ZJ Infosystem office location"
                  src="https://www.google.com/maps?q=Hadapsar+Pune+Maharashtra&output=embed"
                  className="absolute inset-0 h-full w-full grayscale-[35%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Form */}
          <div>
            <div className="relative rounded-3xl border border-border bg-card p-8 md:p-10 overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative min-h-[440px] flex flex-col items-center justify-center text-center"
                    data-testid="contact-success"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 12 }}
                      className="h-20 w-20 rounded-full bg-gradient-to-br from-[hsl(207_100%_45%)] to-[hsl(191_100%_45%)] text-white flex items-center justify-center shadow-[0_20px_50px_-15px_hsl(207_100%_45%_/_0.55)]"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-3xl font-semibold">Message received.</h3>
                    <p className="mt-3 text-muted-foreground max-w-md">
                      Thank you. Our team will reach out within one business day — often faster.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative space-y-5"
                    data-testid="contact-form"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold">Send us a message</h3>
                        <p className="text-xs text-muted-foreground">We reply within one business day.</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name">Full name *</Label>
                        <Input id="full_name" data-testid="contact-full-name" className="mt-2" placeholder="Jane Doe" {...register("full_name")} />
                        {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" data-testid="contact-company" className="mt-2" placeholder="Acme Corp." {...register("company")} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Work email *</Label>
                        <Input id="email" type="email" data-testid="contact-email" className="mt-2" placeholder="jane@company.com" {...register("email")} />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" data-testid="contact-phone" className="mt-2" placeholder="+91 …" {...register("phone")} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">Service interested in</Label>
                      <Select value={serviceValue} onValueChange={(v) => setValue("service", v)}>
                        <SelectTrigger id="service" data-testid="contact-service" className="mt-2">
                          <SelectValue placeholder="Select a service (optional)" />
                        </SelectTrigger>
                        <SelectContent className="max-h-72">
                          {SERVICES.map((s) => (
                            <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>
                          ))}
                          <SelectItem value="Other">Other / Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">How can we help? *</Label>
                      <Textarea id="message" data-testid="contact-message" rows={5} className="mt-2" placeholder="A few lines about what you're trying to solve…" {...register("message")} />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      data-testid="contact-submit-button"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-[hsl(207_100%_38%)] to-[hsl(191_100%_42%)] text-white"
                    >
                      {isSubmitting ? "Sending…" : (<>Send message <ArrowRight className="ml-2 h-4 w-4" /></>)}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center">By submitting, you agree to be contacted by {COMPANY.name}. We respect your privacy.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
