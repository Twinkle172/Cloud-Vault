import "./Loader.css";

interface LoaderProps {
  label?: string;
}

const Loader = ({ label = "Loading..." }: LoaderProps) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loaderRing" />
      <p>{label}</p>
    </div>
  );
};

export default Loader;
