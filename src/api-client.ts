import { clearSessionItem, setSessionItem } from "./lib/helpers";
import { CategoryCreation, ForgotPasswordStep1, ForgotPasswordStep2, LoginProps, ProductCreation, SubCategoryCreation, User, VerifyAccountProps } from "./types/global";
import { APIResponse, UpdateItemType, UpdateItemWithFormData } from "./types/hooks";

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

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
};

export const verifyAccount = async (formData: VerifyAccountProps & { email: string }) => {
  const response = await fetch(`${API_URL}/auth/verify-account/${formData.email}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: formData.code }),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  if (responseBody.data?.user) {
    setSessionItem(USER_INFO, responseBody.data);
  }

  return responseBody;
};

export const resendVerificationCode = async (email: string) => {
  const response = await fetch(`${API_URL}/auth/resend-verification-code/${email}`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
};

export const resetPasswordRequest = async ({ email }: ForgotPasswordStep1) => {
  const response = await fetch(`${API_URL}/auth/forgot-password/${email}`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
};

export const resetForgottenPassword = async ({ code, email, password }: Omit<ForgotPasswordStep2, "confirmPassword"> & { email: string }) => {
  const response = await fetch(`${API_URL}/auth/reset-forgotten-password/${email}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, password }),
  });

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
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

export const updateCategory = async ({ id, data }: UpdateItemType<CategoryCreation>) => {
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

export const getSubCategoriesByCategory = async (category: string) => {
  const response = await fetch(`${API_URL}/sub-categories/identifies/${category}`, {
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

export const updateSubCategory = async ({ id, data }: UpdateItemType<SubCategoryCreation>) => {
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

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getProductSettingsById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/settings/${id}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getProductImage = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}/image`, {
    credentials: "include"
  });

  if (!response.ok) throw new Error("Failed fetch product image");

  return response.blob();
};

export const createProduct = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const updateProduct = async ({ id, data }: UpdateItemWithFormData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data,
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getAllUsers = async (isVerified?: boolean) => {
  const extensionURL =
    isVerified === undefined ? "" : `?isVerified=${isVerified}`;

  const response = await fetch(`${API_URL}/users${extensionURL}`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};


export const getUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getAllBrands = async () => {
  const response = await fetch(`${API_URL}/brands`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getBrandById = async (id: number) => {
  const response = await fetch(`${API_URL}/brands/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getBrandImageById = async (id: number) => {
  const response = await fetch(`${API_URL}/brands/${id}/image`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed fetch brand image");
  return response.blob();
};

export const createBrand = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/brands`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const updateBrand = async ({ id, data, }: UpdateItemWithFormData) => {
  const response = await fetch(`${API_URL}/brands/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteBrand = async (id: number) => {
  const response = await fetch(`${API_URL}/brands/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};
