import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// WCNqyVCuYBFJ8qa-e
// template_642n1zl
// service_nfg9yrm

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
        "service_nfg9yrm",
        "template_642n1zl",
        {
          from_name: form.name,
          to_name: "Awais",
          from_email: form.email,
          to_email:'mawais20212021@gmail.com',
          message: form.message,
        },
        "WCNqyVCuYBFJ8qa-e"
      )
      .then( () => {
          setLoading(false);
          alert("Thank you. I will get back to you soon.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong. Please try again later.");
        }
      );
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Name</span>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="What's your name?"
              value={form.name}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg 
                outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email</span>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="What's your email?"
              value={form.email}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg 
                outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Message</span>
            <textarea
              rows={7}
              name="message"
              onChange={handleChange}
              placeholder="What do you want to say?"
              value={form.message}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg 
                outline-none border-none font-medium "
            />
          </label>
          <button type="submit"
          className="bg-tertiary py-3 px-8 w-fit outline-none text-white font-bold 
          shadow-md shadow-primary rounded-xl"
          > 
          {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");