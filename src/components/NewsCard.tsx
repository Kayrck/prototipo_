import { Link } from "react-router-dom";

interface NewsCardProps {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateFormatted: string;
  category: string;
  categorySlug: string;
  image?: string;
  tags?: string[];
  variant?: "default" | "featured" | "horizontal";
}

export default function NewsCard({
  slug,
  title,
  excerpt,
  dateFormatted,
  category,
  categorySlug,
  image,
  tags = [],
  variant = "default",
}: NewsCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="news-card flex gap-3 group py-3 border-b border-gray-100 last:border-b-0">
        <Link to={`/${slug}/`} className="flex-shrink-0 w-16 h-14 bg-gray-100 rounded-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-red-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#C41230] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </Link>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <Link to={`/${slug}/`} className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2 hover:text-[#C41230] transition-colors mb-1">
            {title}
          </Link>
          <div className="flex items-center gap-1.5">
            <Link to={`/category/${categorySlug}/`} className="text-xs font-semibold text-[#C41230] hover:underline">
              {category}
            </Link>
            <span className="text-gray-300 text-xs">•</span>
            <time className="text-xs text-gray-400">{dateFormatted}</time>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="news-card relative rounded-2xl overflow-hidden bg-gray-900 group h-full min-h-[420px]">
        {image && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8">
          <Link to={`/category/${categorySlug}/`} className="text-xs font-semibold text-[#C41230] bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full w-fit mb-4 hover:bg-white/20 transition-colors uppercase tracking-wider">
            {category}
          </Link>
          <Link to={`/${slug}/`}>
            <h2 className="text-white text-2xl font-bold leading-tight mb-3 hover:text-red-200 transition-colors font-[family-name:var(--font-display)]">
              {title}
            </h2>
          </Link>
          <p className="text-gray-300 text-sm line-clamp-2 mb-4">{excerpt}</p>
          <div className="flex items-center justify-between">
            <time className="text-gray-400 text-xs">{dateFormatted}</time>
            <Link
              to={`/${slug}/`}
              className="text-sm font-semibold text-white flex items-center gap-1.5 hover:text-red-300 transition-colors group/link"
            >
              Leia mais
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="news-card bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col group shadow-sm">
      <Link to={`/${slug}/`} className="block overflow-hidden h-48 bg-gray-100 flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-red-50 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#C41230] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Link
            to={`/category/${categorySlug}/`}
            className="text-xs font-semibold text-[#C41230] uppercase tracking-wider hover:underline"
          >
            {category}
          </Link>
          <span className="text-gray-300 text-xs">•</span>
          <time className="text-xs text-gray-500">{dateFormatted}</time>
        </div>
        <Link to={`/${slug}/`}>
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-3 hover:text-[#C41230] transition-colors font-[family-name:var(--font-display)]">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{excerpt}</p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  to={`/tag/${tag.replace(/\s+/g, "-")}/`}
                  className="text-xs text-gray-500 bg-gray-100 hover:bg-red-50 hover:text-[#C41230] px-2 py-0.5 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <Link
            to={`/${slug}/`}
            className="text-xs font-semibold text-[#C41230] flex items-center gap-1 hover:gap-2 transition-all ml-auto"
            aria-label={`Leia mais sobre ${title}`}
          >
            Leia mais
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-24 rounded" />
        </div>
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-4/5 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
      </div>
    </div>
  );
}
