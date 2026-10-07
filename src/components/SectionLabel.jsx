import { motion } from "framer-motion";

function SectionLabel({ children, number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5 }}
      className="mb-4 flex items-center gap-3"
    >
      {number && (
        <span className="text-xs font-semibold text-slate-400">
          {number}
        </span>
      )}

      <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
        {children}
      </span>
    </motion.div>
  );
}

export default SectionLabel;