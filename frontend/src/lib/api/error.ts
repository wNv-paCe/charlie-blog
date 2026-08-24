export async function getApiError(response: Response): Promise<Error> {
  try {
    const data = await response.json();

    if (Array.isArray(data.detail)) {
      return new Error(
        data.detail.map((error: { msg: string }) => error.msg).join(", "),
      );
    }

    if (data.detail) {
      return new Error(data.detail);
    }
  } catch {
    // ignore json parse error
  }

  return new Error("Something went wrong. Please try again.");
}
