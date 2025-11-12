import { login, logout, resendVerificationCode, resetForgottenPassword, resetPasswordRequest, signup, validateAuthentication, verifyAccount } from "@/api-client";
import { useAppContext } from "@/contexts/AppProvider";
import { APIResponse } from "@/types/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useValidateAuthentication = () => {
  return useQuery({
    queryKey: ["verify-authentication"],
    queryFn: validateAuthentication,
    gcTime: 0,
    retry: false
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>) => {
    pushToast({ message: data.message, type: "SUCCESS" })
    queryClient.invalidateQueries({ queryKey: ["verify-authentication"], exact: true });
    router.replace("/")
  }
  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: login,
    onSuccess,
    onError
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  const onSuccess = (data: APIResponse<unknown>) => {
    pushToast({ message: data.message, type: "SUCCESS" });
    queryClient.invalidateQueries({ queryKey: ["verify-authentication"], exact: true });
    router.replace("/login");
  };

  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" });
  };

  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};

export const useSignup = () => {
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<{ email: string }>) => {
    pushToast({ message: data.message, type: "SUCCESS" })

    const email = data.data.email
    router.replace(`/verify/email?email=${encodeURIComponent(email)}`)
  }
  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: signup,
    onSuccess,
    onError
  })
}

export const useVerifyAccount = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>) => {
    pushToast({ message: data.message, type: "SUCCESS" })
    queryClient.invalidateQueries({ queryKey: ["verify-authentication"], exact: true });
    router.replace("/")
  }
  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: verifyAccount,
    onSuccess,
    onError
  })
}

export const useResendVerificationCode = () => {
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>) => {
    pushToast({ message: data.message, type: "SUCCESS" })
  }
  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: resendVerificationCode,
    onSuccess,
    onError
  })
}

export const useResetPasswordRequest = () => {
  const { pushToast } = useAppContext()

  const onSuccess = (data: APIResponse<unknown>) => {
    pushToast({ message: data.message, type: "SUCCESS" })
  }
  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess,
    onError
  })
}

export const useResetForgottenPassword = () => {
  const { pushToast } = useAppContext()
  const router = useRouter()

  const onSuccess = (data: APIResponse<unknown>) => {
    pushToast({ message: data.message, type: "SUCCESS" })
    router.replace("/login")

  }
  const onError = (error: Error) => {
    pushToast({ message: error.message, type: "ERROR" })
  }

  return useMutation({
    mutationFn: resetForgottenPassword,
    onSuccess,
    onError
  })
}