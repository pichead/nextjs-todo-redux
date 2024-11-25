import { ENV } from "@/utils/constants";
import { cookiesHandler } from "@/utils/cookies";
import axios from "axios";

const backend = ENV.backend;
const accessTokenName = ENV.accessTokenName;
const refreshTokenName = ENV.refreshTokenName;

const apiAuth = axios.create({
  baseURL: backend,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAuth.interceptors.request.use(
  (request) => {
    const accessToken = cookiesHandler.get(accessTokenName);
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiPublic = axios.create({
  baseURL: backend,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (
  email: string,
  password: string
): Promise<IResponse | null> => {
  try {
    let payload = JSON.stringify({
      email: email,
      password: password,
    });

    const call = await apiPublic.post("/api/v1/auth/login", payload);
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const validate = async (): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.get("/api/v1/auth/validate-client");
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskCreate = async (name: string): Promise<IResponse | null> => {
  try {
    let payload = JSON.stringify({
      name: name,
    });

    const call = await apiAuth.post("/api/v1/task/create", payload);
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskEdit = async (
  id: number,
  name: string
): Promise<IResponse | null> => {
  try {
    let payload = JSON.stringify({
      name: name,
    });

    const call = await apiAuth.patch("/api/v1/task/update/" + id, payload);
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskPending = async (id: number): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.patch("/api/v1/task/pending/" + id);
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskCompete = async (id: number): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.patch("/api/v1/task/complete/" + id);
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskRemoveComplete = async (): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.delete("/api/v1/task/remove-complete");
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskRemoveAll = async (): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.delete("/api/v1/task/remove-all");
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

const taskRemove = async (id: number): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.delete("/api/v1/task/remove/" + id);
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};
const taskFindAll = async (): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.get("/api/v1/task/findall");
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};
const taskFindAllActive = async (): Promise<IResponse | null> => {
  try {
    const call = await apiAuth.get("/api/v1/task/findall-active");
    const res = await call.data;
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      console.log(error);
      return null;
    }
  }
};

export const apis = {
  auth: {
    login: login,
    validate: validate,
  },
  task: {
    create: taskCreate,
    edit: taskEdit,
    complete: taskCompete,
    pending: taskPending,
    removeComplete: taskRemoveComplete,
    removeAll: taskRemoveAll,
    remove: taskRemove,
    findAll: taskFindAll,
    findAllActive: taskFindAllActive,
  },
};
