import { useState } from "react";
import { useTheme } from "../../ui/Settings/themeUtils";
import { Video, Upload, User, Calendar, Briefcase, Building, CheckCircle, AlertCircle } from "lucide-react";

const FaceRegistration = () => {
  const [formData, setFormData] = useState({
    labourCode: "",
    firstName: "",
    lastName: "",
    designation: "",
    department: "",
    joiningDate: "",
  });
  const [labourVideos, setLabourVideos] = useState({});
  const [videoPreview, setVideoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { theme, themeUtils } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.labourCode) errors.labourCode = "Labour Code is required";
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.designation) errors.designation = "Please select a designation";
    if (!formData.department) errors.department = "Please select a department";
    if (!formData.joiningDate) errors.joiningDate = "Joining Date is required";
    if (!labourVideos[formData.labourCode]) errors.video = "Please upload a video";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const processVideoFile = (file) => {
    if (!file || !formData.labourCode) return;
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setFormErrors({ ...formErrors, video: "Please upload a valid video file" });
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    setLabourVideos((prev) => ({
      ...prev,
      [formData.labourCode]: file,
    }));
    setVideoPreview(previewUrl);
    // Clear video error if exists
    if (formErrors.video) {
      setFormErrors({ ...formErrors, video: null });
    }
  };

  const handleVideoUpload = (e) => {
    processVideoFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processVideoFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        ...formData,
        video: labourVideos[formData.labourCode],
      });
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          labourCode: "",
          firstName: "",
          lastName: "",
          designation: "",
          department: "",
          joiningDate: "",
        });
        setVideoPreview(null);
        setLabourVideos({});
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div
      className=" min-h-screen overflow-hidden"
      style={{ backgroundColor: themeUtils.getBgColor("default") }}
    >
      {/* HEADER */}
      <div
        className="rounded-xl shadow-lg p-4 mb-4"
        style={{ backgroundColor: themeUtils.getBgColor("card") }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Face Enrollment System
            </h1>
            
          </div>
         
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {submitSuccess && (
        <div className="mb-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700 flex items-center">
          <CheckCircle className="mr-2" size={20} />
          <span>Registration successful! The labour has been enrolled successfully.</span>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* LEFT - VIDEO */}
        <div className="lg:col-span-2 h-full">
          <div
            className="rounded-xl shadow-lg p-6 "
            style={{ backgroundColor: themeUtils.getBgColor("card") }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: themeUtils.getTextColor() }}>
              <Video className="mr-2" size={20} />
              Video Capture
            </h2>
            
            <div
              className={`relative w-full h-96 rounded-lg overflow-hidden border-2 transition-all ${
                isDragging ? "border-dashed border-blue-500 bg-blue-50" : ""
              } ${formErrors.video ? "border-red-500" : ""}`}
              style={{ borderColor: isDragging ? "" : themeUtils.getBorderColor() }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {/* VIDEO PLAYER */}
              {videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover rounded-lg bg-black"
                />
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.6))",
                    color: "#FFFFFF",
                  }}
                >
                  <Video size={64} className="mb-4 opacity-80" />
                  <p className="font-semibold text-lg mb-2">
                    Drag & Drop video here
                  </p>
                  <p className="text-sm opacity-80 mb-4">or click to browse</p>
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
                    <Upload size={16} className="mr-2" />
                    <span>Upload Video</span>
                  </div>
                </div>
              )}
              
              {/* FILE INPUT */}
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              
              {/* ERROR MESSAGE */}
              {formErrors.video && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-2 rounded-lg flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  <span className="text-sm">{formErrors.video}</span>
                </div>
              )}
            </div>
            
            {videoPreview && (
              <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-sm font-medium">Video uploaded successfully</span>
                </div>
                <button
                  onClick={() => {
                    setVideoPreview(null);
                    setLabourVideos({});
                  }}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* RIGHT - FORM */}
        <div
          className="rounded-xl shadow-lg p-6  flex flex-col"
          style={{ backgroundColor: themeUtils.getBgColor("card") }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: themeUtils.getTextColor() }}>
            <User className="mr-2" size={20} />
            Labour Registration
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
            <div className="space-y-4">
              {/* Labour Code */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 flex items-center"
                  style={{ color: themeUtils.getTextColor() }}
                >
                  Labour Code <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="labourCode"
                    value={formData.labourCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-all ${
                      formErrors.labourCode ? "border-red-500" : ""
                    }`}
                    style={{
                      borderColor: formErrors.labourCode ? "" : themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                    }}
                    placeholder="Enter labour code"
                  />
                  {formErrors.labourCode && (
                    <div className="absolute right-3 top-2.5 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {formErrors.labourCode && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.labourCode}</p>
                )}
              </div>
              
              {/* First Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 flex items-center"
                  style={{ color: themeUtils.getTextColor() }}
                >
                  First Name <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-all ${
                      formErrors.firstName ? "border-red-500" : ""
                    }`}
                    style={{
                      borderColor: formErrors.firstName ? "" : themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                    }}
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <div className="absolute right-3 top-2.5 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {formErrors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                )}
              </div>
              
              {/* Last Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 flex items-center"
                  style={{ color: themeUtils.getTextColor() }}
                >
                  Last Name <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-all ${
                      formErrors.lastName ? "border-red-500" : ""
                    }`}
                    style={{
                      borderColor: formErrors.lastName ? "" : themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                    }}
                    placeholder="Enter last name"
                  />
                  {formErrors.lastName && (
                    <div className="absolute right-3 top-2.5 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {formErrors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
                )}
              </div>
              
              {/* Designation */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 flex items-center"
                  style={{ color: themeUtils.getTextColor() }}
                >
                  <Briefcase size={16} className="mr-1" />
                  Designation <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm outline-none appearance-none transition-all ${
                      formErrors.designation ? "border-red-500" : ""
                    }`}
                    style={{
                      borderColor: formErrors.designation ? "" : themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                    }}
                  >
                    <option value="">Select Designation</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Worker">Worker</option>
                    <option value="Engineer">Engineer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {formErrors.designation && (
                    <div className="absolute right-8 top-2.5 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {formErrors.designation && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.designation}</p>
                )}
              </div>
              
              {/* Department */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 flex items-center"
                  style={{ color: themeUtils.getTextColor() }}
                >
                  <Building size={16} className="mr-1" />
                  Department <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm outline-none appearance-none transition-all ${
                      formErrors.department ? "border-red-500" : ""
                    }`}
                    style={{
                      borderColor: formErrors.department ? "" : themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="Construction">Construction</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Safety">Safety</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {formErrors.department && (
                    <div className="absolute right-8 top-2.5 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {formErrors.department && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.department}</p>
                )}
              </div>
              
              {/* Joining Date */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 flex items-center"
                  style={{ color: themeUtils.getTextColor() }}
                >
                  <Calendar size={16} className="mr-1" />
                  Joining Date <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-all ${
                      formErrors.joiningDate ? "border-red-500" : ""
                    }`}
                    style={{
                      borderColor: formErrors.joiningDate ? "" : themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                    }}
                  />
                  {formErrors.joiningDate && (
                    <div className="absolute right-3 top-2.5 text-red-500">
                      <AlertCircle size={16} />
                    </div>
                  )}
                </div>
                {formErrors.joiningDate && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.joiningDate}</p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg text-sm font-semibold shadow-md transition-all mt-2 flex items-center justify-center"
              style={{
                background: `linear-gradient(to right, ${
                  theme.headerBg || "#3B82F6"
                }, ${theme.navbarBg || "#8B5CF6"})`,
                color: "#FFFFFF",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  REGISTER LABOUR
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FaceRegistration;