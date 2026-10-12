import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

function ResourceCard({
  resource,
  linkTo,
}) {
  const {
    title,
    description,
    category = "Resource",
    image,
    slug,
    type = "Report",
  } = resource;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-teal-400 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 to-slate-800">
            <FileText
              size={48}
              className="text-teal-400"
            />
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
          <FileText size={14} />
          {type}
        </div>

        <h3 className="text-xl font-bold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-teal-600">
          {title}
        </h3>

        {description && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}

        <Link
          to={linkTo || `/resources/${slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
        >
          Explore Resource

          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default ResourceCard;