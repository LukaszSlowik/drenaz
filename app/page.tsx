import Image from "next/image";
import Counter from "./components/Counter";
import MainCounter from "./components/MainCounter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  w-full">
      <MainCounter />
    </main>
  );
}
