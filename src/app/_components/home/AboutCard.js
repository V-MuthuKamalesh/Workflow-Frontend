import { East } from "@mui/icons-material";
import Link from "next/link";

export default function AboutCard({ Icon, color, title, description }) {
  return (
    <div className="max-w-sm h-52 p-4 space-y-2 rounded-xl shadow-lg bg-zinc-500 cursor-pointer hover:-translate-y-[2px] transition-all">
      <Icon fill={color} />
      <h2 className="text-xl">{title}</h2>
      <p className="text-sm">{description}</p>
      <div>
        <Link
          className="text-sm hover:underline hover:underline-offset-2"
          href={"/learn-more"}
        >
          Learn more <East />
        </Link>
      </div>
    </div>
  );
}
