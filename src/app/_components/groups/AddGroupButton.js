import { addGroup } from "@/lib/redux/feautures/boardSlice";
import { useDispatch } from "react-redux";

export default function AddGroupButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      onClick={() => dispatch(addGroup())}
    >
      Add Group
    </button>
  );
}
