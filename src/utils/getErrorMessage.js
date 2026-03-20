export default function getErrorMessage(err, fallback = "Something went wrong") {
  if (!err) return fallback;
  const responseMessage = err?.response?.data?.message;
  if (typeof responseMessage === "string" && responseMessage.trim()) return responseMessage;
  const responseError = err?.response?.data?.error;
  if (typeof responseError === "string" && responseError.trim()) return responseError;
  if (typeof err.message === "string" && err.message.trim()) return err.message;
  return fallback;
}

