import Image from "next/image";
import MapView from "@/src/components//MapView";

export default function Home() {
  return (
    <>
      <main style={{ height: "100vh", width: "100%" }}>
        <MapView />
      </main>
    </>
  );
}
