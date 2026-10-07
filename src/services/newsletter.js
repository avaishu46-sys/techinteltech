const SUBSCRIBE_API_URL =
  (import.meta.env.DEV && import.meta.env.VITE_NEWSLETTER_API_URL) ||
  `${import.meta.env.BASE_URL}api/subscribe.php`;

export async function createNewsletterSubscription(email, cadence = "weekly") {
  const response = await fetch(SUBSCRIBE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), cadence }),
  });
  const responseText = await response.text();
  let result = {};

  if (responseText) {
    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error(
        `The subscription service returned an unreadable response (HTTP ${response.status}).`
      );
    }
  } else {
    throw new Error(
      `The subscription service returned an empty response (HTTP ${response.status}). Check that subscribe.php is deployed at ${SUBSCRIBE_API_URL}.`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || "We could not subscribe you. Please try again."
    );
  }

  if (
    result.status !== "subscribed" &&
    result.status !== "already_subscribed"
  ) {
    throw new Error(
      result.message ||
        "The subscription service returned an unexpected response."
    );
  }

  return result;
}
