import api from "@/lib/api";

export const initTracking = async () => {
  if (sessionStorage.getItem("utm_tracked")) {
    return;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const utmSource = queryParams.get("utm_source");
  const utmMedium = queryParams.get("utm_medium");
  const utmCampaign = queryParams.get("utm_campaign");

  if (!utmSource && !utmMedium && !utmCampaign) {
    return;
  }

  try {
    await api.post("/api/track", {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    });

    sessionStorage.setItem("utm_tracked", "true");
    // console.log("Tracked from campaign:", utmCampaign);
  } catch (error) {
    console.error("Error while sending UTM tracking:", error);
  }
};