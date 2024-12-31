import Google from "../svg/Google";

export default function GoogleAuthButton({ text, className }) {
  return (
    <button className={className}>
      <Google />
      <span>{text}</span>
    </button>
  );
}
