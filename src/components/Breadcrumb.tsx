import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural" className="py-3 border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-[#C41230] transition-colors font-medium">
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-1.5">
              <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 6 10" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4-4 4" />
              </svg>
              {item.href && i < items.length - 1 ? (
                <Link to={item.href} className="hover:text-[#C41230] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
