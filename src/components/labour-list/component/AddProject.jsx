import { useTheme } from "../../../ui/Settings/themeUtils";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddProject = () => {
  const { theme, themeUtils } = useTheme();

  const inputStyle = {
    backgroundColor: themeUtils.getBgColor("input"),
    borderColor: themeUtils.getBorderColor(),
    color: themeUtils.getTextColor(false),
  };

  const labelStyle = {
    color: themeUtils.getTextColor(true),
  };

  return (
    <div className="p-1">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h1
          className="font-bold text-lg"
          style={{ color: themeUtils.getTextColor(true) }}
        >
          New Project
        </h1>

        <Link to="/project-management">
          <button
            className="p-2 rounded"
            style={{
              backgroundColor: themeUtils.getBgColor("hover"),
              color: themeUtils.getTextColor(true),
            }}
          >
            <ArrowLeft size={18} />
          </button>
        </Link>
      </div>

      {/* FORM CARD */}
      <div
        className="rounded-xl border shadow-sm p-6"
        style={{
          backgroundColor: themeUtils.getBgColor("card"),
          borderColor: themeUtils.getBorderColor(),
        }}
      >
        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Community Name <span className="text-red-500">*</span>
            </label>
            <select
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            >
              <option>Select a Community</option>
              <option>Palm Jumeirah Elite</option>
              <option>Al Furjan</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Project Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Total Floors <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Total Units <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Choose Subscription <span className="text-red-500">*</span>
            </label>
            <select
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            >
              <option>Select Subscription</option>
              <option>Premium</option>
              <option>Standard</option>
            </select>
          </div>
        </div>

        <hr
          className="my-6"
          style={{ borderColor: themeUtils.getBorderColor() }}
        />

        {/* ADDRESS DETAILS */}
        <h2
          className="text-md font-semibold mb-4"
          style={{ color: themeUtils.getTextColor(true) }}
        >
          Address Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Address Line 2
            </label>
            <input
              type="text"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              Country <span className="text-red-500">*</span>
            </label>
            <select
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            >
              <option>Select Country</option>
              <option>UAE</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              City <span className="text-red-500">*</span>
            </label>
            <select
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            >
              <option>Select City</option>
              <option>Dubai</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium" style={labelStyle}>
              ZIP Code
            </label>
            <input
              type="text"
              className="mt-1 w-full p-1 border rounded"
              style={inputStyle}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">
          <Link to="/project-management">
            <button
              className="px-5 py-2 rounded"
              style={{
                backgroundColor: themeUtils.getBgColor("hover"),
                color: themeUtils.getTextColor(true),
              }}
            >
              Cancel
            </button>
          </Link>

          <button
            className="px-5 py-2 rounded text-white"
            style={{ backgroundColor: theme.headerBg || "#6366f1" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
