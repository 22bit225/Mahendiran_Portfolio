










document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  // Timestamp & Date-Time
  const now = new Date();
  data.append("timestamp", now.toISOString());
  data.append("datetime", now.toLocaleString());

  // Screen size
  data.append("screensize", `${screen.width}x${screen.height}`);

  // Device type
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  data.append("device", isMobile ? "Mobile" : "Desktop");

  // OS detection
  let os = "Unknown";
  if (navigator.userAgent.indexOf("Windows") !== -1) os = "Windows";
  else if (navigator.userAgent.indexOf("Android") !== -1) os = "Android";
  else if (navigator.userAgent.indexOf("iPhone") !== -1) os = "iOS";
  else if (navigator.userAgent.indexOf("Mac") !== -1) os = "macOS";
  data.append("os", os);

  // Browser detection
  let browser = "Unknown";
  if (navigator.userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (navigator.userAgent.indexOf("Edg") !== -1) browser = "Edge";
  else if (navigator.userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (navigator.userAgent.indexOf("Safari") !== -1) browser = "Safari";
  data.append("browser", browser);

  // Get IP & Location
  const res = await fetch("https://ipapi.co/json/");
  const ipData = await res.json();

  data.append("ip", ipData.ip);
  data.append("city", ipData.city);
  data.append("region", ipData.region);
  data.append("country", ipData.country_name);
  data.append("emailaddr", ipData.email || "N/A");

  // SEND TO GOOGLE SHEET
  fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
    method: "POST",
    body: data
  })
  .then(() => alert("Message submitted successfully"))
  .catch(() => alert("Submission failed"));
});
