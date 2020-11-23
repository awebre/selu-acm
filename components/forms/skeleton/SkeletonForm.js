function SkeletonForm({ children }) {
  return <div className="grid grid-cols-6 gap-2 p-10">{children}</div>;
}

function FormGroup({ type = "input" }) {
  return (
    <>
      {type === "input" && (
        <>
          <div className="col-span-3 bg-gray-300 p-4 rounded animate-pulse"></div>
          <div className="col-span-6 bg-gray-100 p-5 mb-2 rouned animate-pulse"></div>
        </>
      )}
      {type === "checkbox" && (
        <>
          <div className="col-span-1 bg-gray-300 p-4 mb-2 rounded animage-pulse"></div>
          <div className="col-span-1 bg-gray-100 p-5 mb-2 rounded animate-pulse"></div>
        </>
      )}
    </>
  );
}

SkeletonForm.FormGroup = FormGroup;
export default SkeletonForm;
