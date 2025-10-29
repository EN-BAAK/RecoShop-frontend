import { clearSessionItem, setSessionItem } from "./lib/helpers";
import { CategoryCreation, LoginProps, SubCategoryCreation, User } from "./types/global";
import { APIResponse, UpdateItemFormData } from "./types/hooks";

const API_URL = process.env.NEXT_PUBLIC_API_URL!
const USER_INFO = process.env.NEXT_PUBLIC_USER_INFO!

export const validateAuthentication = async (): Promise<APIResponse<User>> => {
  const response = await fetch(`${API_URL}/auth/verify`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  if (responseBody.data) {
    setSessionItem(USER_INFO, {
      username: `${responseBody.data.firstName} ${responseBody.data.lastName}`,
      role: responseBody.data.role,
      email: responseBody.data.email
    });
  }

  return responseBody;
};

export const login = async (formData: LoginProps) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  if (responseBody.data?.user) {
    setSessionItem(USER_INFO, responseBody.data);
  }

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  clearSessionItem(USER_INFO);

  return responseBody;
};

export const signup = async (formData: LoginProps) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  if (responseBody.data?.user) {
    setSessionItem(USER_INFO, responseBody.data);
  }

  return responseBody;
};

export const getAllCategories = async () => {
  const response = await fetch(`${API_URL}/categories`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getCategoryById = async (id: number) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const createCategory = async (formData: CategoryCreation) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const updateCategory = async ({ id, data }: UpdateItemFormData<CategoryCreation>) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const deleteCategory = async (id: number) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getAllSubCategories = async () => {
  const response = await fetch(`${API_URL}/sub-categories`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getSubCategoryById = async (id: number) => {
  const response = await fetch(`${API_URL}/sub-categories/${id}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const createSubCategory = async (formData: SubCategoryCreation) => {
  const response = await fetch(`${API_URL}/sub-categories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const updateSubCategory = async ({ id, data }: UpdateItemFormData<SubCategoryCreation>) => {
  const response = await fetch(`${API_URL}/sub-categories/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const deleteSubCategory = async (id: number) => {
  const response = await fetch(`${API_URL}/sub-categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}
