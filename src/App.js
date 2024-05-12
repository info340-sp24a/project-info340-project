import { PageHeader } from "./components/Header"
import { UploadForm } from "./components/Upload"
import { Footer } from "./components/Footer";

export default function App(props) {
  return (
    <div>
      <PageHeader />
      <div>
        <UploadForm />
      </div>
      <Footer />
    </div>
  );
}