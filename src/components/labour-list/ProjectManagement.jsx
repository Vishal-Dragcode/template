import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Trash2, Play, X, Plus, Search, Download, Upload, Video as VideoIcon, Calendar } from 'lucide-react';
import { useTheme } from "../../ui/Settings/themeUtils";

const LabourManagement = () => {
  const [labourData, setLabourData] = useState([
    { id: 1, name: 'Pooja J', code: 'RJ009', department: 'Construction', designation: 'Carpenter', joiningDate: '2023-01-15', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
    { id: 2, name: 'Niraj J', code: 'LAB001', department: 'Electrical', designation: 'Electrician', joiningDate: '2023-02-20', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
    { id: 3, name: 'Pooja J', code: 'RJ06', department: 'Plumbing', designation: 'Plumber', joiningDate: '2023-03-10', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
    { id: 4, name: 'Amit P', code: 'RJ01', department: 'Construction', designation: 'Mason', joiningDate: '2023-04-05', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
    { id: 5, name: 'Shubham B', code: 'RJ03', department: 'General', designation: 'Helper', joiningDate: '2023-05-12', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
    { id: 6, name: 'Sahil G', code: 'RJ04', department: 'Management', designation: 'Supervisor', joiningDate: '2023-06-18', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
    { id: 7, name: 'Sangram G', code: 'RJ02', department: 'Construction', designation: 'Carpenter', joiningDate: '2023-07-22', video: 'https://www.w3schools.com/html/mov_bbb.mp4', videoBlob: null },
  ]);

  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDateFilter, setFromDateFilter] = useState('');
  const [toDateFilter, setToDateFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentLabour, setCurrentLabour] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    code: '',
    department: '',
    designation: '',
    joiningDate: '',
    videoBlob: null,
    videoURL: ''
  });

  const [dragActive, setDragActive] = useState(false);
  const videoInputRef = useRef(null);
  const videoPreviewRef = useRef(null);

  // Get theme and theme utilities
  const { theme, themeUtils } = useTheme();

  const departments = ['Construction', 'Electrical', 'Plumbing', 'Management', 'General', 'Other'];
  const designations = ['Carpenter', 'Electrician', 'Plumber', 'Mason', 'Helper', 'Supervisor', 'Engineer', 'Other'];

  const filteredData = labourData.filter(labour => {
    const matchesSearch = labour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         labour.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         labour.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         labour.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (fromDateFilter && toDateFilter) {
      const labourDate = new Date(labour.joiningDate);
      const fromDate = new Date(fromDateFilter);
      const toDate = new Date(toDateFilter);
      matchesDate = labourDate >= fromDate && labourDate <= toDate;
    } else if (fromDateFilter) {
      const labourDate = new Date(labour.joiningDate);
      const fromDate = new Date(fromDateFilter);
      matchesDate = labourDate >= fromDate;
    } else if (toDateFilter) {
      const labourDate = new Date(labour.joiningDate);
      const toDate = new Date(toDateFilter);
      matchesDate = labourDate <= toDate;
    }
    
    return matchesSearch && matchesDate;
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleVideoFile = (file) => {
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        videoBlob: file,
        videoURL: url
      });
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleVideoInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleVideoFile(e.target.files[0]);
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setFormData({ 
      firstName: '', 
      lastName: '', 
      code: '', 
      department: '', 
      designation: '', 
      joiningDate: '',
      videoBlob: null, 
      videoURL: '' 
    });
    setShowModal(true);
  };

  const handleEdit = (labour) => {
    setModalType('edit');
    setCurrentLabour(labour);
    const nameParts = labour.name.split(' ');
    setFormData({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      code: labour.code,
      department: labour.department || '',
      designation: labour.designation || '',
      joiningDate: labour.joiningDate || '',
      videoBlob: labour.videoBlob,
      videoURL: labour.video
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this labour record?')) {
      setLabourData(labourData.filter(labour => labour.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.code || !formData.department || !formData.designation || !formData.joiningDate) {
      alert('Please fill all required fields (First Name, Last Name, Labour Code, Department, Designation, Joining Date)');
      return;
    }

    if (!formData.videoURL && !formData.videoBlob) {
      alert('Please upload a video');
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`;

    if (modalType === 'add') {
      const newLabour = {
        id: labourData.length > 0 ? Math.max(...labourData.map(l => l.id)) + 1 : 1,
        name: fullName,
        code: formData.code,
        department: formData.department,
        designation: formData.designation,
        joiningDate: formData.joiningDate,
        video: formData.videoURL,
        videoBlob: formData.videoBlob
      };
      setLabourData([...labourData, newLabour]);
    } else {
      setLabourData(labourData.map(labour =>
        labour.id === currentLabour.id ? { 
          ...labour, 
          name: fullName,
          code: formData.code,
          department: formData.department,
          designation: formData.designation,
          joiningDate: formData.joiningDate,
          video: formData.videoURL,
          videoBlob: formData.videoBlob
        } : labour
      ));
    }
    setShowModal(false);
    setFormData({ 
      firstName: '', 
      lastName: '', 
      code: '', 
      department: '', 
      designation: '', 
      joiningDate: '',
      videoBlob: null, 
      videoURL: '' 
    });
  };

  const handlePlayVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setShowVideoModal(true);
  };

  const exportToCSV = () => {
    const headers = ['Sr. No', 'Name', 'Labour Code', 'Department', 'Designation', 'Joining Date'];
    const csvData = labourData.map((labour, index) => [
      index + 1,
      labour.name,
      labour.code,
      labour.department || 'N/A',
      labour.designation || 'N/A',
      labour.joiningDate || 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'labour_list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearDateFilters = () => {
    setFromDateFilter('');
    setToDateFilter('');
  };

  const closeModal = () => {
    setShowModal(false);
    if (formData.videoURL && !labourData.find(l => l.video === formData.videoURL)) {
      URL.revokeObjectURL(formData.videoURL);
    }
  };

  useEffect(() => {
    return () => {
      if (formData.videoURL && !labourData.find(l => l.video === formData.videoURL)) {
        URL.revokeObjectURL(formData.videoURL);
      }
    };
  }, []);

  // Create dynamic gradient style for headers based on theme
  const headerGradientStyle = {
    background: `linear-gradient(to right, ${theme.headerBg || '#3b82f6'}, ${theme.navbarBg || '#8b5cf6'})`,
  };

  // Create dynamic button styles based on theme
  const getButtonStyle = (type) => {
    if (type === 'primary') {
      return {
        background: `linear-gradient(to right, ${theme.headerBg || '#3b82f6'}, ${theme.headerBg || '#2563eb'})`,
        color: '#ffffff'
      };
    } else if (type === 'success') {
      return {
        background: `linear-gradient(to right, #10b981, #059669)`,
        color: '#ffffff'
      };
    }
    return {};
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeUtils.getBgColor("default") }}>
      <div className="max-w-7xl mx-auto">
        {/* Compact Header with Controls */}
        <div className="rounded-xl shadow-lg p-4 mb-4" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               Labour List
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <label className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>Show:</label>
                <select
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                  className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ 
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: themeUtils.getTextColor()
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
              
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: themeUtils.getTextColor(false) }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ 
                    borderColor: themeUtils.getBorderColor(),
                    backgroundColor: themeUtils.getBgColor("input"),
                    color: themeUtils.getTextColor()
                  }}
                />
              </div>
              
              {/* Date Range Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: themeUtils.getTextColor(false) }} />
                  <input
                    type="date"
                    placeholder="From date"
                    value={fromDateFilter}
                    onChange={(e) => setFromDateFilter(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    style={{ 
                      borderColor: themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                      width: '150px'
                    }}
                  />
                </div>
                <span style={{ color: themeUtils.getTextColor(false) }}>to</span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} style={{ color: themeUtils.getTextColor(false) }} />
                  <input
                    type="date"
                    placeholder="To date"
                    value={toDateFilter}
                    onChange={(e) => setToDateFilter(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    style={{ 
                      borderColor: themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor(),
                      width: '150px'
                    }}
                  />
                </div>
                {(fromDateFilter || toDateFilter) && (
                  <button
                    onClick={clearDateFilters}
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: themeUtils.getTextColor(false) }}
                    title="Clear date filters"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg transition-all shadow-md hover:shadow-lg"
                style={getButtonStyle('primary')}
              >
                <Plus size={16} />
                Add
              </button>
              
              <button
                onClick={exportToCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg transition-all shadow-md hover:shadow-lg"
                style={getButtonStyle('success')}
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Compact Table */}
        <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={headerGradientStyle} className="text-white">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Sr.</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Name</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Code</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Department</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Designation</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Joining Date</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Video</th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: themeUtils.getBorderColor() }}>
                {filteredData.slice(0, recordsPerPage).map((labour, index) => (
                  <tr 
                    key={labour.id} 
                    className="transition-colors hover:bg-opacity-10"
                  >
                    <td className="px-3 py-2 text-sm font-medium" style={{ color: themeUtils.getTextColor() }}>{index + 1}</td>
                    <td className="px-3 py-2 text-sm font-medium" style={{ color: themeUtils.getTextColor() }}>{labour.name}</td>
                    <td className="px-3 py-2 text-sm" style={{ color: themeUtils.getTextColor(false) }}>{labour.code}</td>
                    <td className="px-3 py-2 text-sm" style={{ color: themeUtils.getTextColor(false) }}>{labour.department || 'N/A'}</td>
                    <td className="px-3 py-2 text-sm" style={{ color: themeUtils.getTextColor(false) }}>{labour.designation || 'N/A'}</td>
                    <td className="px-3 py-2 text-sm" style={{ color: themeUtils.getTextColor(false) }}>{formatDate(labour.joiningDate)}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handlePlayVideo(labour.video)}
                        className="text-sm font-medium flex items-center gap-1 transition-colors"
                        style={{ 
                          color: theme.headerBg || '#3b82f6'
                        }}
                      >
                        <Play size={14} />
                        Play
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEdit(labour)}
                          className="p-1.5 rounded-lg transition-colors"
                          title="Edit"
                          style={{ 
                            color: theme.headerBg || '#3b82f6'
                          }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(labour.id)}
                          className="p-1.5 rounded-lg transition-colors"
                          title="Delete"
                          style={{ 
                            color: '#ef4444'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-lg flex items-center justify-center p-4 z-50 overflow-y-auto ">
            <div className="rounded-xl shadow-2xl w-full max-w-5xl my-4" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
              <div style={headerGradientStyle} className="text-white p-3 flex justify-between items-center">
                <h2 className="text-lg font-bold">
                  {modalType === 'add' ? 'Face Enrollment' : 'Edit Labour'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1.5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Side - Video Upload */}
                  <div className="space-y-3">
                    <div 
                      className={`border-3 border-dashed rounded-lg p-4 transition-all ${
                        dragActive ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      style={{ 
                        borderWidth: '3px',
                        borderColor: dragActive ? theme.headerBg || '#3b82f6' : themeUtils.getBorderColor(),
                        backgroundColor: dragActive ? (theme.headerBg || '#3b82f6') + '10' : '#3a3a3a',
                        minHeight: '380px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {!formData.videoURL ? (
                        <div className="text-center">
                          <div className="mb-4 flex justify-center">
                            <div className="p-4 rounded-xl bg-gray-600">
                              <VideoIcon className="text-gray-400" size={48} />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 text-gray-400">
                            Drag & Drop Video
                          </h3>
                          <p className="text-gray-500 mb-4 text-sm">
                            or click to select
                          </p>
                          <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleVideoInputChange}
                            className="hidden"
                          />
                          <button
                            onClick={() => videoInputRef.current?.click()}
                            className="px-4 py-2 rounded-lg transition-all shadow-md text-sm font-medium"
                            style={getButtonStyle('primary')}
                          >
                            <Upload className="inline mr-1.5" size={16} />
                            Select Video
                          </button>
                        </div>
                      ) : (
                        <div className="w-full">
                          <video
                            ref={videoPreviewRef}
                            controls
                            src={formData.videoURL}
                            className="w-full rounded-lg shadow-lg"
                            style={{ maxHeight: '340px' }}
                          />
                          <button
                            onClick={() => {
                              if (formData.videoURL) {
                                URL.revokeObjectURL(formData.videoURL);
                              }
                              setFormData({ ...formData, videoURL: '', videoBlob: null });
                            }}
                            className="mt-3 w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md text-sm font-medium"
                          >
                            Remove Video
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Labour Registration Form */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold mb-3" style={{ color: themeUtils.getTextColor() }}>
                      Labour Registration
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>
                        Labour Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        placeholder="Enter labour code"
                        style={{ 
                          borderColor: themeUtils.getBorderColor(),
                          backgroundColor: themeUtils.getBgColor("input"),
                          color: themeUtils.getTextColor()
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        placeholder="Enter first name"
                        style={{ 
                          borderColor: themeUtils.getBorderColor(),
                          backgroundColor: themeUtils.getBgColor("input"),
                          color: themeUtils.getTextColor()
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        placeholder="Enter last name"
                        style={{ 
                          borderColor: themeUtils.getBorderColor(),
                          backgroundColor: themeUtils.getBgColor("input"),
                          color: themeUtils.getTextColor()
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        style={{ 
                          borderColor: themeUtils.getBorderColor(),
                          backgroundColor: themeUtils.getBgColor("input"),
                          color: themeUtils.getTextColor()
                        }}
                      >
                        <option value="">-- Select Department --</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        style={{ 
                          borderColor: themeUtils.getBorderColor(),
                          backgroundColor: themeUtils.getBgColor("input"),
                          color: themeUtils.getTextColor()
                        }}
                      >
                        <option value="">-- Select Designation --</option>
                        {designations.map(desig => (
                          <option key={desig} value={desig}>{desig}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>
                        Joining Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.joiningDate}
                        onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        style={{ 
                          borderColor: themeUtils.getBorderColor(),
                          backgroundColor: themeUtils.getBgColor("input"),
                          color: themeUtils.getTextColor()
                        }}
                      />
                    </div>

                    <div className="pt-3 flex gap-2">
                      <button
                        onClick={handleSubmit}
                        className="flex-1 py-2.5 rounded-lg transition-all shadow-md font-semibold text-base uppercase tracking-wide"
                        style={getButtonStyle('primary')}
                      >
                        REGISTER
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-6 py-2.5 rounded-lg transition-colors font-semibold text-base"
                        style={{ 
                          backgroundColor: themeUtils.getBgColor("hover"),
                          color: themeUtils.getTextColor(),
                          border: `1px solid ${themeUtils.getBorderColor()}`
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {showVideoModal && (
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-lg flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="rounded-xl shadow-2xl max-w-5xl w-full" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
              <div style={headerGradientStyle} className="text-white p-4 flex justify-between items-center rounded-t-xl">
                <h2 className="text-xl font-bold">Labour Registration Video</h2>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <video
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                  src={currentVideo}
                  style={{ maxHeight: '70vh' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabourManagement;