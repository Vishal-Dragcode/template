export const SUPER_ADMIN_MENU = [
  {
    menu_icon: "MdDashboard",
    menu: "Dashboard",
    page_url: "/dashboard",
  },
  {
    menu_icon: "MdPeople",
    menu: "Organization",
    sub_menus: [
      { sub_menu: "Company Profile", page_url: "/organization/company-profile" },
      { sub_menu: "Departments", page_url: "/organization/departments" },
      { sub_menu: "Teams", page_url: "/organization/teams" },
      { sub_menu: "Designations", page_url: "/organization/designations" },
      { sub_menu: "Employee Management", page_url: "/organization/employees" },
      { sub_menu: "Attendance", page_url: "/organization/attendance" },
      { sub_menu: "Leave Management", page_url: "/organization/leaves" },
    ],
  },
  {
    menu_icon: "MdFolder",
    menu: "Project Management",
    sub_menus: [
      { sub_menu: "Projects", page_url: "/projects/list" },
      { sub_menu: "Project Categories", page_url: "/projects/categories" },
      { sub_menu: "Clients", page_url: "/projects/clients" },
      { sub_menu: "Milestones", page_url: "/projects/milestones" },
      { sub_menu: "Project Timeline", page_url: "/projects/timeline" },
      { sub_menu: "Project Status", page_url: "/projects/status" },
    ],
  },
  {
    menu_icon: "MdCheckCircle",
    menu: "Task Management",
    sub_menus: [
      { sub_menu: "All Tasks", page_url: "/tasks/all" },
      { sub_menu: "Create Task", page_url: "/tasks/create" },
      { sub_menu: "Task Board (Kanban)", page_url: "/tasks/kanban" },
      { sub_menu: "Task Calendar", page_url: "/tasks/calendar" },
      { sub_menu: "Task Templates", page_url: "/tasks/templates" },
      { sub_menu: "Recurring Tasks", page_url: "/tasks/recurring" },
      { sub_menu: "Task Archive", page_url: "/tasks/archive" },
    ],
  },
  {
    menu_icon: "MdAccessTime",
    menu: "Time Management",
    sub_menus: [
      { sub_menu: "Time Tracker", page_url: "/time/tracker" },
      { sub_menu: "Clock In / Clock Out", page_url: "/time/clock" },
      { sub_menu: "Daily Work Log", page_url: "/time/daily-log" },
      { sub_menu: "Weekly Timesheet", page_url: "/time/timesheet" },
      { sub_menu: "Productivity Report", page_url: "/time/productivity" },
    ],
  },
  {
    menu_icon: "MdCalendarToday",
    menu: "Work Planning",
    sub_menus: [
      { sub_menu: "Daily Planner", page_url: "/planner/daily" },
      { sub_menu: "Weekly Planner", page_url: "/planner/weekly" },
      { sub_menu: "Monthly Planner", page_url: "/planner/monthly" },
      { sub_menu: "Team Schedule", page_url: "/planner/team-schedule" },
    ],
  },
  {
    menu_icon: "MdChat",
    menu: "Communication",
    sub_menus: [
      { sub_menu: "Announcements", page_url: "/communication/announcements" },
      { sub_menu: "Team Chat", page_url: "/communication/chat" },
      { sub_menu: "Discussion Board", page_url: "/communication/board" },
      { sub_menu: "Meetings", page_url: "/communication/meetings" },
    ],
  },
  {
    menu_icon: "MdInsertDriveFile",
    menu: "Documents",
    sub_menus: [
      { sub_menu: "Files", page_url: "/documents/files" },
      { sub_menu: "Company Documents", page_url: "/documents/company" },
      { sub_menu: "Policies", page_url: "/documents/policies" },
      { sub_menu: "Templates", page_url: "/documents/templates" },
    ],
  },
  {
    menu_icon: "MdBarChart",
    menu: "Reports",
    sub_menus: [
      { sub_menu: "Productivity", page_url: "/reports/productivity" },
      { sub_menu: "Employee Performance", page_url: "/reports/performance" },
      { sub_menu: "Attendance Report", page_url: "/reports/attendance" },
      { sub_menu: "Leave Report", page_url: "/reports/leave" },
      { sub_menu: "Time Report", page_url: "/reports/time" },
      { sub_menu: "Project Report", page_url: "/reports/project" },
    ],
  },
  {
    menu_icon: "MdAttachMoney",
    menu: "Finance",
    sub_menus: [
      { sub_menu: "Payroll", page_url: "/finance/payroll" },
      { sub_menu: "Expenses", page_url: "/finance/expenses" },
      { sub_menu: "Invoices", page_url: "/finance/invoices" },
    ],
  },
  {
    menu_icon: "MdSettings",
    menu: "Settings",
    sub_menus: [
      { sub_menu: "Roles", page_url: "/settings/roles" },
      { sub_menu: "Permissions", page_url: "/settings/permissions" },
      { sub_menu: "Departments", page_url: "/settings/departments" },
      { sub_menu: "Holidays", page_url: "/settings/holidays" },
      { sub_menu: "Working Hours", page_url: "/settings/working-hours" },
      { sub_menu: "Notifications", page_url: "/settings/notifications" },
      { sub_menu: "Email Settings", page_url: "/settings/email" },
      { sub_menu: "System Settings", page_url: "/settings/system" },
    ],
  },
];

export const ADMIN_MENU = [
  {
    menu_icon: "MdDashboard",
    menu: "Dashboard",
    page_url: "/dashboard",
  },
  {
    menu_icon: "MdPeople",
    menu: "Team",
    sub_menus: [
      { sub_menu: "Employees", page_url: "/team/employees" },
      { sub_menu: "Attendance", page_url: "/team/attendance" },
      { sub_menu: "Leave Requests", page_url: "/team/leave-requests" },
    ],
  },
  {
    menu_icon: "MdFolder",
    menu: "Projects",
    sub_menus: [
      { sub_menu: "My Projects", page_url: "/projects/my-projects" },
      { sub_menu: "Milestones", page_url: "/projects/milestones" },
      { sub_menu: "Deadlines", page_url: "/projects/deadlines" },
    ],
  },
  {
    menu_icon: "MdCheckCircle",
    menu: "Task Management",
    sub_menus: [
      { sub_menu: "Create Task", page_url: "/tasks/create" },
      { sub_menu: "Assign Task", page_url: "/tasks/assign" },
      { sub_menu: "My Tasks", page_url: "/tasks/my-tasks" },
      { sub_menu: "Team Tasks", page_url: "/tasks/team-tasks" },
      { sub_menu: "Kanban Board", page_url: "/tasks/kanban" },
      { sub_menu: "Calendar", page_url: "/tasks/calendar" },
    ],
  },
  {
    menu_icon: "MdAccessTime",
    menu: "Time Tracking",
    sub_menus: [
      { sub_menu: "Team Timesheet", page_url: "/time/team-timesheet" },
      { sub_menu: "Daily Logs", page_url: "/time/daily-logs" },
      { sub_menu: "Productivity", page_url: "/time/productivity" },
    ],
  },
  {
    menu_icon: "MdCalendarToday",
    menu: "Planner",
    sub_menus: [
      { sub_menu: "Daily Planner", page_url: "/planner/daily" },
      { sub_menu: "Weekly Planner", page_url: "/planner/weekly" },
    ],
  },
  {
    menu_icon: "MdInsertDriveFile",
    menu: "Documents",
    page_url: "/documents",
  },
  {
    menu_icon: "MdChat",
    menu: "Team Chat",
    page_url: "/communication/chat",
  },
  {
    menu_icon: "MdBarChart",
    menu: "Reports",
    sub_menus: [
      { sub_menu: "Team Performance", page_url: "/reports/team-performance" },
      { sub_menu: "Task Completion", page_url: "/reports/task-completion" },
      { sub_menu: "Attendance", page_url: "/reports/attendance" },
    ],
  },
];

export const EMPLOYEE_MENU = [
  {
    menu_icon: "MdDashboard",
    menu: "Dashboard",
    page_url: "/dashboard",
  },
  {
    menu_icon: "MdFolder",
    menu: "My Projects",
    page_url: "/projects/my-projects",
  },
  {
    menu_icon: "MdCheckCircle",
    menu: "My Tasks",
    sub_menus: [
      { sub_menu: "Today's Tasks", page_url: "/tasks/today" },
      { sub_menu: "Pending", page_url: "/tasks/pending" },
      { sub_menu: "In Progress", page_url: "/tasks/in-progress" },
      { sub_menu: "Completed", page_url: "/tasks/completed" },
      { sub_menu: "Calendar", page_url: "/tasks/calendar" },
    ],
  },
  {
    menu_icon: "MdAccessTime",
    menu: "Time Tracker",
    sub_menus: [
      { sub_menu: "Start Timer", page_url: "/time/start-timer" },
      { sub_menu: "Stop Timer", page_url: "/time/stop-timer" },
      { sub_menu: "Daily Work Log", page_url: "/time/daily-log" },
      { sub_menu: "Weekly Timesheet", page_url: "/time/timesheet" },
    ],
  },
  {
    menu_icon: "MdCalendarToday",
    menu: "Planner",
    sub_menus: [
      { sub_menu: "Daily Plan", page_url: "/planner/daily" },
      { sub_menu: "Weekly Plan", page_url: "/planner/weekly" },
    ],
  },
  {
    menu_icon: "MdListAlt",
    menu: "Daily Report",
    page_url: "/reports/daily",
  },
  {
    menu_icon: "MdInsertDriveFile",
    menu: "Documents",
    page_url: "/documents",
  },
  {
    menu_icon: "MdChat",
    menu: "Team Chat",
    page_url: "/communication/chat",
  },
  {
    menu_icon: "MdBeachAccess",
    menu: "Leave",
    sub_menus: [
      { sub_menu: "Apply Leave", page_url: "/leave/apply" },
      { sub_menu: "Leave History", page_url: "/leave/history" },
    ],
  },
];

export const getMenuByRole = (role) => {
  // Convert role to lower case string to ensure matching
  const roleStr = String(role).toLowerCase();
  
  if (roleStr.includes("super") || roleStr === "1") {
    return SUPER_ADMIN_MENU;
  } else if (roleStr.includes("admin") || roleStr === "2") {
    return ADMIN_MENU;
  } else if (roleStr.includes("employee") || roleStr === "3") {
    return EMPLOYEE_MENU;
  }
  
  // Default fallback if role is undefined or not matched
  return EMPLOYEE_MENU;
};
