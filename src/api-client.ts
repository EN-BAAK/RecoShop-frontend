import { CachedUser, CategoryCreation, ForgotPasswordStep1, ForgotPasswordStep2, LoginProps, SubCategoryCreation, User, VerifyAccountProps } from "./types/global";
import { APIResponse, GetShopProductsParams, GetUserBillProps, PurchaseBill, UpdateItemType, UpdateItemWithFormData } from "./types/hooks";

const API_URL = process.env.NEXT_PUBLIC_API_URL!

let cachedUser: CachedUser = null;
const CACHE_DURATION = 60 * 1000;

export const validateAuthenticationWithCaching = async (
  token: string
): Promise<APIResponse<User> | null> => {
  const now = Date.now();

  if (cachedUser && now - cachedUser.timestamp < CACHE_DURATION) {
    return {
      success: true,
      message: "User fetched from cache",
      data: cachedUser.data,
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/verify-protected-middleware`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();

    if (!response.ok) return null;

    cachedUser = { data: responseBody.data, timestamp: now };

    return responseBody;
  } catch {
    return null;
  }
};

export const validateAuthentication = async (): Promise<APIResponse<User>> => {
  const response = await fetch(`${API_URL}/auth/verify`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

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

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

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

  if (responseBody.data?.user)

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
  const response = await fetch(`${API_URL}/categories`)

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getAllCategoriesIdentities = async () => {
  const response = await fetch(`${API_URL}/categories/identities`, {
    credentials: "include"
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
  const response = await fetch(`${API_URL}/sub-categories`)

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

export const getAllProducts = async (limit: number, page: number) => {
  const response = await fetch(`${API_URL}/products?limit=${limit}&page=${page}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getShopProductsPaginatedByCategory = async ({
  limit,
  category,
  search,
  page = 0,
}: GetShopProductsParams) => {

  const queryParams = new URLSearchParams();
  queryParams.append("limit", String(limit));
  queryParams.append("page", String(page));

  if (category) queryParams.append("category", category);
  if (search) queryParams.append("search", search);

  const response = await fetch(
    `${API_URL}/products/shop?${queryParams.toString()}`
  );

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getProductSettingsById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/settings/${id}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`)

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}
export const getRelatedProducts = async (id: number) => {
  const response = await fetch(`${API_URL}/products/shop/related-products/${id}`)

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getProductImage = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}/image`);

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

export const getAllBrandsIdentities = async () => {
  const response = await fetch(`${API_URL}/brands/identities`, {
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
export const getBrandImageByName = async (name: string) => {
  const response = await fetch(`${API_URL}/brands/name/${name}/image`);

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

export const getUserBills = async ({ startDate, endDate }: GetUserBillProps) => {
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.append("startDate", String(startDate));
  if (endDate) queryParams.append("endDate", String(endDate));

  const response = await fetch(`${API_URL}/bills?${queryParams}`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const purchaseBill = async ({ products }: PurchaseBill) => {
  const response = await fetch(`${API_URL}/bills/purchase`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products }),
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}

export const getDashboardData = async () => {
  const response = await fetch(`${API_URL}/dashboard`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) throw new Error(responseBody.message)

  return responseBody
}