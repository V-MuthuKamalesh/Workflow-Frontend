import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center space-x-2 text-indigo-600 font-medium hover:underline transition"
    >
      <ArrowBack />
      <span>Back</span>
    </button>
  );
}
