import { useParams, useNavigate } from "react-router-dom";
import { Undo2, Pencil } from "lucide-react";
import { useTheme } from "../../../ui/Settings/themeUtils";

const sampleData = [
  {
    id: 1,
    community: "Palm Jumeirah Elite",
    project: "Pearl Towers",
    floors: 15,
    units: 95,
    subscription: "Premium",
    rate: "20.00",
    discountedRate: "18.00",
    addressLine1: "Dubai Marina, Near JBR Walk",
    country: "UAE",
    city: "Dubai",
    zip: "25314",
    totalMeters: 4,
    assigned: 4,
    unassigned: 0,
    facilityManager: null,
    image: "/src/assets/img.jpeg",
  },
];

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children, themeUtils }) => (
  <div className="">
    <h2
      className="text-base font-semibold"
      style={{ color: themeUtils.getTextColor(true) }}
    >
      {title}
    </h2>

    {children}

    <div
      className="pt-2"
      style={{ borderBottom: `1px solid ${themeUtils.getBorderColor()}` }}
    />
  </div>
);

const Row = ({ label, value, themeUtils }) => (
  <div className="flex flex-wrap gap-1">
    <span
      className="text-sm font-medium"
      style={{ color: themeUtils.getTextColor(false) }}
    >
      {label}
    </span>
    <span className="text-sm" style={{ color: themeUtils.getTextColor(true) }}>
      {value}
    </span>
  </div>
);

/* ---------- MAIN COMPONENT ---------- */

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, themeUtils } = useTheme();

  const data = sampleData.find((i) => i.id === Number(id));
  if (!data) return null;

  return (
    <div className="p-1">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-xl font-bold"
          style={{ color: themeUtils.getTextColor(true) }}
        >
          Project Information
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md"
          style={{
            backgroundColor: theme.headerBg || "#6366f1",
            color: "#ffffff",
          }}
        >
          <Undo2 size={18} />
        </button>
      </div>

      {/* CARD */}
      <div
        className="rounded-xl border shadow-sm p-6"
        style={{
          backgroundColor: themeUtils.getBgColor("card"),
          borderColor: themeUtils.getBorderColor(),
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-2">
          {/* IMAGE (REPLACED – STRUCTURE UNCHANGED) */}
          <div className="flex justify-start">
            <div
              className="relative w-56 h-56 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: themeUtils.getBgColor("hover") }}
            >
              <img
                src={data.image}
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

          {/* DETAILS */}
          <div className="space-y-2">
            <Section title="Project Details" themeUtils={themeUtils}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                <Row
                  label="Community Name:"
                  value={data.community}
                  themeUtils={themeUtils}
                />
                <Row
                  label="Total Floors:"
                  value={data.floors}
                  themeUtils={themeUtils}
                />
                <Row
                  label="Project Name:"
                  value={data.project}
                  themeUtils={themeUtils}
                />
                <Row
                  label="Total Units:"
                  value={data.units}
                  themeUtils={themeUtils}
                />
              </div>
            </Section>

            <Section title="Subscription Details" themeUtils={themeUtils}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2">
                <Row
                  label="Subscription:"
                  value={data.subscription}
                  themeUtils={themeUtils}
                />
                <Row label="Rate:" value={data.rate} themeUtils={themeUtils} />
                <Row
                  label="Discounted Rate:"
                  value={data.discountedRate}
                  themeUtils={themeUtils}
                />
              </div>
            </Section>

            <Section title="Address Details" themeUtils={themeUtils}>
              <Row
                label="Address:"
                value={data.addressLine1}
                themeUtils={themeUtils}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2">
                <Row
                  label="Country:"
                  value={data.country}
                  themeUtils={themeUtils}
                />
                <Row label="City:" value={data.city} themeUtils={themeUtils} />
                <Row
                  label="Zip Code:"
                  value={data.zip}
                  themeUtils={themeUtils}
                />
              </div>
            </Section>

            <Section title="Additional Details" themeUtils={themeUtils}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2">
                <Row
                  label="Total Meters:"
                  value={data.totalMeters}
                  themeUtils={themeUtils}
                />
                <Row
                  label="Assigned:"
                  value={data.assigned}
                  themeUtils={themeUtils}
                />
                <Row
                  label="Unassigned:"
                  value={data.unassigned}
                  themeUtils={themeUtils}
                />
              </div>
            </Section>

            <Section title="Facility Manager Details" themeUtils={themeUtils}>
              <p
                className="text-sm"
                style={{ color: themeUtils.getTextColor(false) }}
              >
                A Facility Manager has not been assigned to this tower.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
