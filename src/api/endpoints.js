import api from "./client";

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  me: () => api.get("/auth/me"),
};

export const employeesApi = {
  list: (params) => api.get("/employees", { params }),
  get: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post("/employees", data),
  update: (id, data) => api.patch(`/employees/${id}`, data),
  remove: (id) => api.delete(`/employees/${id}`),
};

export const attendanceApi = {
  list: (params) => api.get("/attendance", { params }),
  checkIn: (employeeId, coords) => api.post("/attendance/check-in", { employeeId, ...coords, source: "WEB" }),
  checkOut: (employeeId, coords) => api.post("/attendance/check-out", { employeeId, ...coords }),
  summary: (employeeId, month) => api.get("/attendance/summary", { params: { employeeId, month } }),
  markPaidLeave: (data) => api.post("/attendance/mark-paid-leave", data),
};

export const officesApi = {
  list: () => api.get("/offices"),
  create: (data) => api.post("/offices", data),
  update: (id, data) => api.patch(`/offices/${id}`, data),
  remove: (id) => api.delete(`/offices/${id}`),
};

export const permissionsApi = {
  list: (params) => api.get("/permissions", { params }),
  create: (data) => api.post("/permissions", data),
  updateStatus: (id, status) => api.patch(`/permissions/${id}`, { status }),
};

export const payrollApi = {
  list: (params) => api.get("/payroll", { params }),
  create: (data) => api.post("/payroll", data),
  update: (id, data) => api.patch(`/payroll/${id}`, data),
  remove: (id) => api.delete(`/payroll/${id}`),
  generateMonth: (month) => api.post("/payroll/generate-month", { month }),
  recalculate: (id) => api.patch(`/payroll/${id}/recalculate`),
};

export const holidaysApi = {
  list: (params) => api.get("/holidays", { params }),
  create: (data) => api.post("/holidays", data),
  remove: (id) => api.delete(`/holidays/${id}`),
};

export const settingsApi = {
  get: () => api.get("/settings"),
  update: (data) => api.patch("/settings", data),
};

export const leavesApi = {
  list: (params) => api.get("/leaves", { params }),
  create: (data) => api.post("/leaves", data),
  updateStatus: (id, status) => api.patch(`/leaves/${id}`, { status }),
};
