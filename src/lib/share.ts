interface ShareInput {
  title: string;
  text: string;
  url: string;
}

export async function shareResult(
  input: ShareInput,
): Promise<"shared" | "copied"> {
  const nativeShare = (
    navigator as unknown as { share?: (data: ShareData) => Promise<void> }
  ).share;
  if (nativeShare) {
    try {
      await nativeShare.call(navigator, input);
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError")
        throw error;
    }
  }
  await navigator.clipboard.writeText(input.url);
  return "copied";
}
