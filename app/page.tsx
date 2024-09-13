import { CreateProgramForm } from "./components/CreateProgramForm";
import { ListTabs } from "./components/ListTabs";

export default function Home() {
  return (
    <div>
      <main className="max-w-6xl mx-auto  py-14">
        <div className="text-3xl text-center">DEMO TIN OA & ZNS</div>
        <ListTabs />
        <CreateProgramForm />
      </main>
    </div>
  );
}
