export default function Devider({text} : {text: string}) {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-600">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
