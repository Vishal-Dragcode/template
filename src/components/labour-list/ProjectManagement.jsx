import React, { useState } from 'react';
import { Edit2, Trash2, Play, X, Plus, Search, Download } from 'lucide-react';
import { useTheme } from "../../ui/Settings/themeUtils";

const LabourManagement = () => {
  const [labourData, setLabourData] = useState([
    { id: 1, name: 'Pooja J', code: 'RJ009', emiratesId: '5464564', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, name: 'Niraj J', code: 'LAB001', emiratesId: '874120545645', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 3, name: 'Pooja J', code: 'RJ06', emiratesId: '874120545645', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 4, name: 'Amit P', code: 'RJ01', emiratesId: '423434224', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 5, name: 'Shubham B', code: 'RJ03', emiratesId: '1234-5678-9012', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 6, name: 'Sahil G', code: 'RJ04', emiratesId: '7025984188', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 7, name: 'Sangram G', code: 'RJ02', emiratesId: '784125690', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ]);

  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentLabour, setCurrentLabour] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    emiratesId: '',
    video: ''
  });

  // Get theme and theme utilities (removed ThemeToggleButton)
  const { theme, themeUtils } = useTheme();

  const filteredData = labourData.filter(labour =>
    labour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labour.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labour.emiratesId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setModalType('add');
    setFormData({ name: '', code: '', emiratesId: '', video: '' });
    setShowModal(true);
  };

  const handleEdit = (labour) => {
    setModalType('edit');
    setCurrentLabour(labour);
    setFormData({
      name: labour.name,
      code: labour.code,
      emiratesId: labour.emiratesId,
      video: labour.video
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this labour record?')) {
      setLabourData(labourData.filter(labour => labour.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.code || !formData.emiratesId || !formData.video) {
      alert('Please fill all fields');
      return;
    }

    if (modalType === 'add') {
      const newLabour = {
        id: Math.max(...labourData.map(l => l.id)) + 1,
        ...formData
      };
      setLabourData([...labourData, newLabour]);
    } else {
      setLabourData(labourData.map(labour =>
        labour.id === currentLabour.id ? { ...labour, ...formData } : labour
      ));
    }
    setShowModal(false);
    setFormData({ name: '', code: '', emiratesId: '', video: '' });
  };

  const handlePlayVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setShowVideoModal(true);
  };

  const exportToCSV = () => {
    const headers = ['Sr. No', 'Name', 'Labour Code', 'Emirates ID'];
    const csvData = labourData.map((labour, index) => [
      index + 1,
      labour.name,
      labour.code,
      labour.emiratesId
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
  };

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

  // Get hover styles for buttons
  const getButtonHoverStyle = (type) => {
    if (type === 'primary') {
      return {
        background: `linear-gradient(to right, ${theme.headerBg || '#2563eb'}, ${theme.headerBg || '#1d4ed8'})`
      };
    } else if (type === 'success') {
      return {
        background: `linear-gradient(to right, #059669, #047857)`
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeUtils.getBgColor("default") }}>
      <div className="max-w-7xl mx-auto">
        {/* Compact Header with Controls */}
        <div className="rounded-xl shadow-lg p-4 mb-4" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Registered Labour List
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
              
              {/* Theme Toggle Button Removed */}
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
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Emirates ID</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold">Video</th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: themeUtils.getBorderColor() }}>
                {filteredData.slice(0, recordsPerPage).map((labour, index) => (
                  <tr 
                    key={labour.id} 
                    className="transition-colors hover:bg-opacity-10"
                    style={{ 
                      ':hover': { backgroundColor: theme.headerBg }
                    }}
                  >
                    <td className="px-3 py-2 text-sm font-medium" style={{ color: themeUtils.getTextColor() }}>{index + 1}</td>
                    <td className="px-3 py-2 text-sm font-medium" style={{ color: themeUtils.getTextColor() }}>{labour.name}</td>
                    <td className="px-3 py-2 text-sm" style={{ color: themeUtils.getTextColor(false) }}>{labour.code}</td>
                    <td className="px-3 py-2 text-sm" style={{ color: themeUtils.getTextColor(false) }}>{labour.emiratesId}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handlePlayVideo(labour.video)}
                        className="text-sm font-medium flex items-center gap-1 transition-colors"
                        style={{ 
                          color: theme.headerBg || '#3b82f6',
                          ':hover': { color: theme.headerBg ? theme.headerBg + 'dd' : '#2563eb' }
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
                            color: theme.headerBg || '#3b82f6',
                            ':hover': { backgroundColor: (theme.headerBg || '#3b82f6') + '20' }
                          }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(labour.id)}
                          className="p-1.5 rounded-lg transition-colors"
                          title="Delete"
                          style={{ 
                            color: '#ef4444',
                            ':hover': { backgroundColor: '#ef444420' }
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl shadow-2xl max-w-md w-full" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
              <div style={headerGradientStyle} className="text-white p-4 flex justify-between items-center rounded-t-xl">
                <h2 className="text-lg font-bold">
                  {modalType === 'add' ? 'Add New Labour' : 'Edit Labour'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1.5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter name"
                    style={{ 
                      borderColor: themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor()
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>Labour Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter labour code"
                    style={{ 
                      borderColor: themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor()
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>Emirates ID</label>
                  <input
                    type="text"
                    value={formData.emiratesId}
                    onChange={(e) => setFormData({ ...formData, emiratesId: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter Emirates ID"
                    style={{ 
                      borderColor: themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor()
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: themeUtils.getTextColor() }}>Video URL</label>
                  <input
                    type="url"
                    value={formData.video}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://example.com/video.mp4"
                    style={{ 
                      borderColor: themeUtils.getBorderColor(),
                      backgroundColor: themeUtils.getBgColor("input"),
                      color: themeUtils.getTextColor()
                    }}
                  />
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-2 text-sm rounded-lg transition-all shadow-md font-medium"
                    style={getButtonStyle('primary')}
                  >
                    {modalType === 'add' ? 'Add Labour' : 'Update'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 text-sm rounded-lg transition-colors font-medium"
                    style={{ 
                      backgroundColor: themeUtils.getBgColor("hover"),
                      color: themeUtils.getTextColor()
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="rounded-xl shadow-2xl max-w-4xl w-full" style={{ backgroundColor: themeUtils.getBgColor("card") }}>
              <div style={headerGradientStyle} className="text-white p-3 flex justify-between items-center rounded-t-xl">
                <h2 className="text-lg font-bold">Labour Registration Video</h2>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1.5 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-3">
                <video
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                  src={currentVideo}
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