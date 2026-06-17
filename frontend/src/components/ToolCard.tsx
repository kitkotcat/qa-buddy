import { Link } from "react-router-dom";

type ToolCardProps = {
  title: string;
  description: string;
  path: string;
  status: string;
};

function ToolCard({ title, description, path, status }: ToolCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">
          {status}
        </span>
      </div>

      <p className="mb-6 leading-7 text-slate-400">{description}</p>

      <Link
        to={path}
        className="inline-flex rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        Open tool
      </Link>
    </article>
  );
}

export default ToolCard;
