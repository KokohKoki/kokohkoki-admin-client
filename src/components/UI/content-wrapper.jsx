/* eslint-disable react/prop-types */

export default function ContentWrapper({ children, loading }) {
  return (
    <div className=" bg-white p-4 rounded-lg">
      {loading && <div>loading.</div>}
      {children}
    </div>
  );
}
