import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Pencil, Save } from "lucide-react";
import { useTheme } from "../../../ui/Settings/themeUtils";

const sampleData = [
  {
    id: 1,
    community: "Palm Jumeirah Elite",
    project: "Pearl Towers",
    floors: 15,
    units: 95,
    subscription: "Premium",
    addressLine1: "Dubai Marina, Near JBR Walk",
    addressLine2: "",
    country: "UAE",
    city: "Dubai",
    zip: "25314",
    image: "/src/assets/img.jpeg",
  },
];

const Field = ({ label, children, labelStyle }) => (
  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] items-center gap-3">
    <label className="text-sm font-medium " style={labelStyle}>
      {label}
    </label>
    {children}
  </div>
);

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, themeUtils } = useTheme();

  const [formData, setFormData] = useState(() =>
    sampleData.find((p) => p.id === Number(id))
  );

  if (!formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputStyle = {
    backgroundColor: themeUtils.getBgColor("input"),
    borderColor: themeUtils.getBorderColor(),
    color: themeUtils.getTextColor(true),
  };

  const labelStyle = {
    color: themeUtils.getTextColor(false),
  };

  return (
    <div className="p-1">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-xl font-bold"
          style={{ color: themeUtils.getTextColor(true) }}
        >
          Edit Project
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg"
          style={{
            backgroundColor: theme.headerBg || "#6366f1",
            color: "#fff",
          }}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* CARD */}
      <form>
        <div
          className="rounded-xl border shadow-sm p-6"
          style={{
            backgroundColor: themeUtils.getBgColor("card"),
            borderColor: themeUtils.getBorderColor(),
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
            {/* IMAGE */}
            <div>
              <div
                className="relative w-56 h-56 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: themeUtils.getBgColor("hover") }}
              >
                <img
                  src={formData.image}
                  alt="Project"
                  className="w-44 h-44 rounded-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-3 right-3 p-2 rounded-full"
                  style={{
                    backgroundColor: themeUtils.getBgColor("card"),
                    border: `1px solid ${themeUtils.getBorderColor()}`,
                    color: themeUtils.getTextColor(true),
                  }}
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* ROW 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Community Name" labelStyle={labelStyle}>
                  <select
                    name="community"
                    value={formData.community}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  >
                    <option>Select Community</option>
                    <option>Palm Jumeirah Elite</option>
                    <option>Al Furjan</option>
                  </select>
                </Field>

                <Field label="Project Name" labelStyle={labelStyle}>
                  <input
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  />
                </Field>
              </div>

              {/* ROW 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Total Floors" labelStyle={labelStyle}>
                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  />
                </Field>

                <Field label="Total Units" labelStyle={labelStyle}>
                  <input
                    type="number"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  />
                </Field>
              </div>

              {/* ROW 3 */}
              <Field label="Subscription" labelStyle={labelStyle}>
                <select
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleChange}
                  className="w-full p-1 border rounded"
                  style={inputStyle}
                >
                  <option>Premium</option>
                  <option>Standard</option>
                </select>
              </Field>

              <hr style={{ borderColor: themeUtils.getBorderColor(100) }} />

              {/* ADDRESS */}
              <h3
                className="text-sm font-semibold"
                style={{ color: themeUtils.getTextColor(true) }}
              >
                Address Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Address Line 1" labelStyle={labelStyle}>
                  <input
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  />
                </Field>

                <Field label="Address Line 2" labelStyle={labelStyle}>
                  <input
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Country" labelStyle={labelStyle}>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  >
                    <option>UAE</option>
                  </select>
                </Field>

                <Field label="City" labelStyle={labelStyle}>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  >
                    <option>Dubai</option>
                  </select>
                </Field>

                <Field label="Zip Code" labelStyle={labelStyle}>
                  <input
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                    style={inputStyle}
                  />
                </Field>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 rounded"
                  style={{
                    backgroundColor: themeUtils.getBgColor("hover"),
                    color: themeUtils.getTextColor(false),
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded text-white flex items-center gap-2"
                  style={{ backgroundColor: theme.headerBg || "#6366f1" }}
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
