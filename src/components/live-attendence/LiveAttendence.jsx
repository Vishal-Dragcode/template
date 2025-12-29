import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, Video, Download, X, Star, Users, UserCheck, Activity, Clock, MapPin, Camera, CameraOff } from "lucide-react";
import { useTheme } from "../../ui/Settings/themeUtils";

// LiveCameraCard Component
const LiveCameraCard = ({ 
  activeTab, 
  currentImage, 
  currentStatus,
  imgCheckinRef,
  imgCheckoutRef,
  checkinFrameCount,
  checkoutFrameCount,
  themeUtils
}) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  const headerGradientStyle = {
    background: `linear-gradient(to right, ${themeUtils.getBgColor("primary")}, ${themeUtils.getBgColor("secondary")})`,
  };

  // Start camera function
  const startCamera = async () => {
    setIsLoading(true);
    try {
      setCameraError(null);
      
      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(() => {
              setCameraActive(true);
              setIsLoading(false);
            })
            .catch(err => {
              console.error("Error playing video:", err);
              setCameraError("Failed to play video stream");
              setCameraActive(false);
              setIsLoading(false);
            });
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      let errorMessage = "Unable to access camera. Please check permissions.";
      
      if (error.name === "NotAllowedError") {
        errorMessage = "Camera permission denied. Please allow camera access in your browser settings.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No camera found. Please check if your camera is connected.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Camera is already in use by another application.";
      }
      
      setCameraError(errorMessage);
      setCameraActive(false);
      setIsLoading(false);
    }
  };

  // Stop camera function
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraActive(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Auto-start camera when component mounts or tab changes
  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  return (
    <div className="lg:col-span-5 rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
      <div className="relative">
        {/* Camera View */}
        <div className="aspect-video bg-black relative max-h-64">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 mx-auto mb-2" style={{ borderColor: themeUtils.getBgColor("primary") }}></div>
                <p className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>Initializing camera...</p>
              </div>
            </div>
          ) : cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }} // Mirror the video for a more natural feel
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
              <div className="text-center">
                <CameraOff size={48} className="mx-auto mb-2" style={{ color: themeUtils.getTextColor(false) }} />
                <p className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>Camera is off</p>
                {cameraError && (
                  <p className="text-xs mt-2 px-4" style={{ color: "#ef4444" }}>{cameraError}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Camera Controls */}
          <div className="absolute top-2 left-2">
            <button
              onClick={cameraActive ? stopCamera : startCamera}
              className={`p-2 rounded-full transition-all text-white`}
              style={{ 
                backgroundColor: cameraActive 
                  ? "#ef4444" 
                  : "#10b981"
              }}
              title={cameraActive ? "Stop Camera" : "Start Camera"}
            >
              {cameraActive ? <CameraOff size={16} /> : <Camera size={16} />}
            </button>
          </div>
          
          {/* Status Indicators */}
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium text-white animate-pulse`} 
                 style={{ backgroundColor: cameraActive ? "#10b981" : "#ef4444" }}>
              {cameraActive ? "LIVE" : "OFFLINE"}
            </div>
            <div className="px-2 py-1 rounded-full text-xs text-white" 
                 style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              {activeTab === "checkin" ? checkinFrameCount.current : checkoutFrameCount.current} fps
            </div>
          </div>
          
          {/* Camera Label */}
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs text-white" 
               style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            {activeTab === "checkin" ? "Check-In Camera" : "Check-Out Camera"}
          </div>
        </div>
      </div>
      
      {/* Camera Info Card */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold" style={{ color: themeUtils.getTextColor(true) }}>
            {activeTab === "checkin" ? "Check-In Camera" : "Check-Out Camera"}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${cameraActive ? "animate-pulse" : ""}`} 
                 style={{ backgroundColor: cameraActive ? "#10b981" : themeUtils.getTextColor(false) }}></div>
            <span className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>
              {cameraActive ? "LIVE" : "OFFLINE"}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
            <div className="flex items-center gap-1 mb-1">
              <Activity size={14} style={{ color: themeUtils.getTextColor(false) }} />
              <span className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>
                Frame Rate
              </span>
            </div>
            <p className="text-lg font-bold" style={{ color: themeUtils.getTextColor(true) }}>
              {activeTab === "checkin" ? checkinFrameCount.current : checkoutFrameCount.current}
            </p>
          </div>
          
          <div className="p-2 rounded-lg" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
            <div className="flex items-center gap-1 mb-1">
              <Video size={14} style={{ color: themeUtils.getTextColor(false) }} />
              <span className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>
                Resolution
              </span>
            </div>
            <p className="text-lg font-bold" style={{ color: themeUtils.getTextColor(true) }}>
              {cameraActive ? "1280x720" : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// RegisteredEmployeesCard Component
const RegisteredEmployeesCard = ({ 
  activeTab, 
  currentDetected, 
  checkinDetected,
  labourData,
  themeUtils
}) => {
  const headerGradientStyle = {
    background: `linear-gradient(to right, ${themeUtils.getBgColor("primary")}, ${themeUtils.getBgColor("secondary")})`,
  };

  return (
    <div className="lg:col-span-4 rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
      <div className="px-4 py-3" style={headerGradientStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Registered Employees</h2>
          </div>
          <span className="px-2 py-1 bg-opacity-20 rounded-full text-xs text-white" 
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            Total: {labourData.length}
          </span>
        </div>
      </div>
      
      <div className="p-3" style={{ height: "400px", overflow: "hidden" }}>
        <div 
          className="space-y-2 h-full overflow-y-auto pr-2 scrollbar-hide" 
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE and Edge */
          }}
        >
          {labourData.map((employee) => {
            const isCheckedIn = checkinDetected.some(d => d.id === employee.labour_code);
            const isDetected = currentDetected.some(d => d.id === employee.labour_code);
            
            return (
              <div 
                key={employee.labour_code} 
                className={`p-2 rounded-lg border transition-all`}
                style={{ 
                  backgroundColor: themeUtils.getBgColor("secondary"),
                  borderColor: isDetected 
                    ? themeUtils.getBgColor("primary") 
                    : isCheckedIn 
                      ? "#10b981"
                      : themeUtils.getBorderColor()
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: themeUtils.getTextColor(true) }}>{employee.name}</p>
                    <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>ID: {employee.labour_code}</p>
                    <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>{employee.department}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    {isDetected && (
                      <span className="px-2 py-1 text-white text-xs rounded-full" 
                            style={{ backgroundColor: themeUtils.getBgColor("primary") }}>
                        Detected
                      </span>
                    )}
                    {isCheckedIn && !isDetected && (
                      <span className="px-2 py-1 text-white text-xs rounded-full" 
                            style={{ backgroundColor: "#10b981" }}>
                        Checked In
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// DetectedEmployeesCard Component
const DetectedEmployeesCard = ({ 
  activeTab, 
  currentDetected, 
  labourData,
  themeUtils
}) => {
  const headerGradientStyle = {
    background: `linear-gradient(to right, ${themeUtils.getBgColor("primary")}, ${themeUtils.getBgColor("secondary")})`,
  };

  const getEmployeeName = (id) => {
    const employee = labourData.find(emp => emp.labour_code === id);
    return employee ? employee.name : "Unknown Employee";
  };
  
  const getEmployeeDepartment = (id) => {
    const employee = labourData.find(emp => emp.labour_code === id);
    return employee ? employee.department : "Unknown";
  };

  return (
    <div className="lg:col-span-3 rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
      <div className="px-4 py-3" style={headerGradientStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">
              {activeTab === "checkin" ? "Check-Ins" : "Check-Outs"}
            </h2>
          </div>
          <span className="px-2 py-1 bg-opacity-20 rounded-full text-xs text-white" 
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
            Total: {currentDetected.length}
          </span>
        </div>
      </div>
      
      <div className="p-3" style={{ height: "400px", overflow: "hidden" }}>
        <div 
          className="space-y-2 h-full overflow-y-auto pr-2 scrollbar-hide" 
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE and Edge */
          }}
        >
          {currentDetected.length === 0 ? (
            <div className="text-center py-8" style={{ color: themeUtils.getTextColor(false) }}>
              No {activeTab === "checkin" ? "check-ins" : "check-outs"} detected yet
            </div>
          ) : (
            currentDetected.map((detection) => (
              <div 
                key={`${detection.id}-${detection.detectedAt}`} 
                className="p-2 rounded-lg border"
                style={{ 
                  backgroundColor: themeUtils.getBgColor("secondary"),
                  borderColor: themeUtils.getBorderColor()
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm" style={{ color: themeUtils.getTextColor(true) }}>
                    {getEmployeeName(detection.id)}
                  </p>
                  <span className="px-2 py-1 text-xs rounded-full text-white"
                        style={{ 
                          backgroundColor: activeTab === "checkin" 
                            ? "#10b981" 
                            : "#f97316"
                        }}>
                    {activeTab === "checkin" ? "IN" : "OUT"}
                  </span>
                </div>
                <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>ID: {detection.id}</p>
                <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>{getEmployeeDepartment(detection.id)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={10} style={{ color: themeUtils.getTextColor(false) }} />
                  <p className="text-xs" style={{ color: themeUtils.getTextColor(false) }}>
                    {activeTab === "checkin" ? "Check-in" : "Check-out"}: {detection.detectedAt}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Main LiveCameraDashboard Component
const LiveCameraDashboard = () => {
  const { theme, themeUtils } = useTheme();
  const [activeTab, setActiveTab] = useState("checkin");
  
  // Static data instead of API calls
  const premise = {
    premise_id: "PREMISE_001",
    premise_name: "Main Building",
    location: "Building A, Floor 1"
  };
  
  // Static labour data
  const labourData = [
    { labour_code: "EMP001", name: "John Doe", department: "Security" },
    { labour_code: "EMP002", name: "Jane Smith", department: "Operations" },
    { labour_code: "EMP003", name: "Robert Johnson", department: "Maintenance" },
    { labour_code: "EMP004", name: "Emily Williams", department: "Administration" },
    { labour_code: "EMP005", name: "Michael Brown", department: "Security" },
    { labour_code: "EMP006", name: "Sarah Davis", department: "Operations" },
    { labour_code: "EMP007", name: "David Wilson", department: "Maintenance" },
    { labour_code: "EMP008", name: "Lisa Anderson", department: "Administration" },
    { labour_code: "EMP009", name: "James Taylor", department: "Security" },
    { labour_code: "EMP010", name: "Jennifer Martinez", department: "Operations" },
    { labour_code: "EMP011", name: "William Johnson", department: "Security" },
    { labour_code: "EMP012", name: "Patricia Brown", department: "Operations" },
    { labour_code: "EMP013", name: "Richard Davis", department: "Maintenance" },
    { labour_code: "EMP014", name: "Linda Miller", department: "Administration" },
    { labour_code: "EMP015", name: "Christopher Wilson", department: "Security" },
  ];
  
  // Static check-in detected data
  const [checkinDetected, setCheckinDetected] = useState([
    { id: "EMP001", detectedAt: "09:15:32", check_in: "2023-11-15T09:15:32", check_out: null },
    { id: "EMP003", detectedAt: "09:22:45", check_in: "2023-11-15T09:22:45", check_out: null },
    { id: "EMP005", detectedAt: "09:35:18", check_in: "2023-11-15T09:35:18", check_out: null },
    { id: "EMP007", detectedAt: "10:05:22", check_in: "2023-11-15T10:05:22", check_out: null },
    { id: "EMP009", detectedAt: "10:15:45", check_in: "2023-11-15T10:15:45", check_out: null },
    { id: "EMP011", detectedAt: "10:25:10", check_in: "2023-11-15T10:25:10", check_out: null },
    { id: "EMP013", detectedAt: "10:35:30", check_in: "2023-11-15T10:35:30", check_out: null },
  ]);
  
  // Static check-out detected data
  const [checkoutDetected, setCheckoutDetected] = useState([
    { id: "EMP002", detectedAt: "17:30:15", check_in: "2023-11-15T08:45:00", check_out: "2023-11-15T17:30:15" },
    { id: "EMP004", detectedAt: "17:45:30", check_in: "2023-11-15T09:10:00", check_out: "2023-11-15T17:45:30" },
    { id: "EMP006", detectedAt: "18:05:42", check_in: "2023-11-15T08:30:00", check_out: "2023-11-15T18:05:42" },
    { id: "EMP008", detectedAt: "18:20:10", check_in: "2023-11-15T09:00:00", check_out: "2023-11-15T18:20:10" },
    { id: "EMP010", detectedAt: "18:30:25", check_in: "2023-11-15T08:15:00", check_out: "2023-11-15T18:30:25" },
    { id: "EMP012", detectedAt: "18:40:15", check_in: "2023-11-15T08:20:00", check_out: "2023-11-15T18:40:15" },
    { id: "EMP014", detectedAt: "18:50:30", check_in: "2023-11-15T08:10:00", check_out: "2023-11-15T18:50:30" },
  ]);
  
  // Static status
  const checkinStatus = "LIVE";
  const checkoutStatus = "LIVE";
  
  // Refs for components
  const imgCheckinRef = useRef(null);
  const imgCheckoutRef = useRef(null);
  const checkinFrameCount = useRef(30);
  const checkoutFrameCount = useRef(25);
  
  // Get current data based on active tab
  const currentStatus = activeTab === "checkin" ? checkinStatus : checkoutStatus;
  const currentDetected = activeTab === "checkin" ? checkinDetected : checkoutDetected;

  const headerGradientStyle = {
    background: `linear-gradient(to right, ${themeUtils.getBgColor("primary")}, ${themeUtils.getBgColor("secondary")})`,
  };

  return (
    <div
      className="min-h-screen transition-all duration-300"
      style={{ backgroundColor: themeUtils.getBgColor("default") }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div 
          className="rounded-xl shadow-lg p-4 mb-4" 
          style={{ backgroundColor: themeUtils.getBgColor("card") }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Attendance Monitor
            </h1>
            
            <div className="flex items-center gap-3">
              {/* Date Display */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
                <Calendar size={16} style={{ color: themeUtils.getTextColor(false) }} />
                <span className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              {/* Location Display */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: themeUtils.getBgColor("secondary") }}>
                <MapPin size={16} style={{ color: themeUtils.getTextColor(false) }} />
                <span className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>
                  {premise.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="rounded-xl shadow-lg mb-4 overflow-hidden" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
          <div className="flex border-b" style={{ borderColor: themeUtils.getBorderColor() }}>
            <button
              onClick={() => setActiveTab("checkin")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-all text-white`}
              style={{ 
                backgroundColor: activeTab === "checkin" ? themeUtils.getBgColor("primary") : "transparent",
                color: activeTab === "checkin" ? "white" : themeUtils.getTextColor(false)
              }}
            >
              <UserCheck size={18} />
              Check-In
            </button>
            <button
              onClick={() => setActiveTab("checkout")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-all text-white`}
              style={{ 
                backgroundColor: activeTab === "checkout" ? themeUtils.getBgColor("primary") : "transparent",
                color: activeTab === "checkout" ? "white" : themeUtils.getTextColor(false)
              }}
            >
              <UserCheck size={18} />
              Check-Out
            </button>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <LiveCameraCard
            activeTab={activeTab}
            currentStatus={currentStatus}
            imgCheckinRef={imgCheckinRef}
            imgCheckoutRef={imgCheckoutRef}
            checkinFrameCount={checkinFrameCount}
            checkoutFrameCount={checkoutFrameCount}
            themeUtils={themeUtils}
          />
          <RegisteredEmployeesCard
            activeTab={activeTab}
            currentDetected={currentDetected}
            checkinDetected={checkinDetected}
            labourData={labourData}
            themeUtils={themeUtils}
          />
          <DetectedEmployeesCard
            activeTab={activeTab}
            currentDetected={currentDetected}
            labourData={labourData}
            themeUtils={themeUtils}
          />
        </div>
      </div>
      
      {/* Global CSS for hiding scrollbars */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LiveCameraDashboard;