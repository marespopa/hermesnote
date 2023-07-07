import { containerStyle } from "../constants/styles";
import EmptyState from "./components/EmptyState";

export default function AppPage() {
  return (
    <div className={containerStyle}>
      <EmptyState />
      <div className="my-16">
        <h3 className="text-sm max-w-1/2 text-center mx-auto">
          Want to learn more about how to write markdown. Access the
          documentation page.
        </h3>
      </div>
    </div>
  );
}
