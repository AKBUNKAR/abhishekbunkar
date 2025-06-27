// Force scroll to top on reload (fix for mobile browsers)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Ensure scroll to top on multiple events for mobile compatibility
function forceScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.activeElement.blur(); // Prevent focus on any element
}

// Handle multiple events for robust scroll-to-top
window.addEventListener('pageshow', () => {
  setTimeout(forceScrollToTop, 0);
});
document.addEventListener('DOMContentLoaded', forceScrollToTop);
window.addEventListener('load', forceScrollToTop);

// Remove hash from URL if present
if (window.location.hash) {
  history.replaceState(null, null, ' ');
}

// Trade Selector Logic
const suggestions = {
  "s riskey": "✅ Bullish setup + untouched S = TG likely<br>❌ Avoid if 1st candle touched or Max Gain hit<br>⚠️ Watch WTT/WTB",
  "s moderate": "⚠️ Risky zone<br>✅ Use only in stable market<br>❌ Avoid in shift or multiple touches",
  "r riskey": "✅ Strong in blood bath<br>❌ Avoid if Max Gain touched or 1st candle hit<br>⚠️ RES shift = risk",
  "r moderate": "✅ Best after R RISKEY touch<br>❌ Avoid in volatility or RES shift<br>✅ Watch scenario",
  "9th scenario": "🔎 Confirm zone + Max Gain untouched<br>❌ Avoid if multiple zone touches<br>⚠️ Watch reversal before entry",
  "8th scenario": "⚠️ Fast shift zone<br>❌ Avoid during WTT<br>✅ Use only when stable and Max Gain untouched",
  "bull run": "✅ S RISKEY opportunity<br>❌ Avoid if 1st candle touched<br>⚠️ Use TSL if market slow",
  "blood bath": "✅ Best for R RISKEY<br>❌ Avoid S based trades<br>⚠️ TSL mandatory due to shifting",
  "no trade": "❌ No trade recommended"
};

document.getElementById("zoneSelect").addEventListener("change", function () {
  const value = this.value.toLowerCase();
  const result = suggestions[value] || "ℹ️ Select a valid trade zone";
  document.getElementById("suggestion").innerHTML = result;
});

// Calculator Logic
document.addEventListener("DOMContentLoaded", () => {
  const entryPriceInput = document.getElementById("entryPrice");
  const slPointsInput = document.getElementById("slPoints");
  const targetPointsInput = document.getElementById("targetPoints");
  const tslPointsInput = document.getElementById("tslPoints");
  const tslTriggerPointsInput = document.getElementById("tslTriggerPoints");
  const strickInput = document.getElementById("strick");

  const slPriceOutput = document.getElementById("slPrice");
  const targetPriceOutput = document.getElementById("targetPrice");
  const tslPriceOutput = document.getElementById("tslPrice");
  const tslTriggerPriceOutput = document.getElementById("tslTriggerPrice");

  const togglePointsButton = document.getElementById("toggle-points");
  const pointsSection = document.getElementById("points-section");
  const toggleIcon = document.getElementById("toggle-icon");

  function calculate() {
    const entry = parseFloat(entryPriceInput.value);
    const sl = parseFloat(slPointsInput.value);
    const target = parseFloat(targetPointsInput.value);
    const tsl = parseFloat(tslPointsInput.value);
    const tslTrigger = parseFloat(tslTriggerPointsInput.value);

    if (!isNaN(entry)) {
      slPriceOutput.value = !isNaN(sl) ? (entry - sl).toFixed(2) : "";
      targetPriceOutput.value = !isNaN(target) ? (entry + target).toFixed(2) : "";
      tslPriceOutput.value = !isNaN(tsl) ? (entry + tsl).toFixed(2) : "";
      tslTriggerPriceOutput.value = !isNaN(tslTrigger) ? (entry + tslTrigger).toFixed(2) : "";
    } else {
      slPriceOutput.value = "";
      targetPriceOutput.value = "";
      tslPriceOutput.value = "";
      tslTriggerPriceOutput.value = "";
    }
    saveValues();
  }

  function saveValues() {
    localStorage.setItem("entryPrice", entryPriceInput.value);
    localStorage.setItem("slPoints", slPointsInput.value);
    localStorage.setItem("targetPoints", targetPointsInput.value);
    localStorage.setItem("tslPoints", tslPointsInput.value);
    localStorage.setItem("tslTriggerPoints", tslTriggerPointsInput.value);
    localStorage.setItem("strick", strickInput.value);
  }

  function loadValues() {
    entryPriceInput.value = localStorage.getItem("entryPrice") || "";
    slPointsInput.value = localStorage.getItem("slPoints") || "";
    targetPointsInput.value = localStorage.getItem("targetPoints") || "";
    tslPointsInput.value = localStorage.getItem("tslPoints") || "";
    tslTriggerPointsInput.value = localStorage.getItem("tslTriggerPoints") || "";
    strickInput.value = localStorage.getItem("strick") || "";
    calculate();

    const isPointsHidden = localStorage.getItem("pointsHidden") === "true";
    pointsSection.classList.toggle("hidden", isPointsHidden);
    toggleIcon.classList.toggle("fa-arrow-up", isPointsHidden);
    toggleIcon.classList.toggle("fa-arrow-down", !isPointsHidden);
  }

  [
    entryPriceInput,
    slPointsInput,
    targetPointsInput,
    tslPointsInput,
    tslTriggerPointsInput,
    strickInput
  ].forEach(input => {
    input.addEventListener("input", calculate);
  });

  togglePointsButton.addEventListener("click", () => {
    const isHidden = pointsSection.classList.contains("hidden");
    pointsSection.classList.toggle("hidden", !isHidden);
    toggleIcon.classList.toggle("fa-arrow-down", isHidden);
    toggleIcon.classList.toggle("fa-arrow-up", !isHidden);
    localStorage.setItem("pointsHidden", !isHidden);
  });

  strickInput.addEventListener("input", () => {
    strickInput.value = strickInput.value.toUpperCase();
  });

  function copyToClipboard(inputId) {
    const input = document.getElementById(inputId);
    const value = input.value;
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        const button = document.getElementById(`copy-${inputId}`);
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), 300);
      }).catch(err => console.error("Copy failed:", err));
    }
  }

  ["strick", "entryPrice", "slPrice", "targetPrice", "tslPrice", "tslTriggerPrice"].forEach(id => {
    const button = document.getElementById(`copy-${id}`);
    if (button) {
      button.addEventListener("click", () => copyToClipboard(id));
    }
  });

  loadValues();
});
// Popup functionality
 function showPopup(popupId) {
  console.log('Attempting to show popup:', popupId);
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'flex';
    console.log('Popup displayed:', popupId);
    makePopupDraggable(popupId); // Make popup draggable after showing
  } else {
    console.error('Popup element not found:', popupId);
  }
}

function hidePopup(popupId) {
  console.log('Attempting to hide popup:', popupId);
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'none';
    console.log('Popup hidden:', popupId);
  } else {
    console.error('Popup element not found:', popupId);
  }
}

function makePopupDraggable(popupId) {
  const popup = document.getElementById(popupId);
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  if (!popup) {
    console.error("Popup not found:", popupId);
    return;
  }

  popup.style.position = 'absolute';
  popup.style.cursor = 'move';

  popup.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - popup.getBoundingClientRect().left;
    offsetY = e.clientY - popup.getBoundingClientRect().top;
    popup.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      popup.style.left = e.clientX - offsetX + 'px';
      popup.style.top = e.clientY - offsetY + 'px';
    }
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
}

//popup floating buttan//
document.addEventListener('DOMContentLoaded', () => {
  const toolsButton = document.getElementById('toolsButton');
  const toolsMenu = document.getElementById('toolsMenu');
  const scrollToTop = document.getElementById('scrollToTop');

  // Toggle tools menu visibility
  toolsButton.addEventListener('click', () => {
    const isMenuVisible = toolsMenu.style.display === 'flex';
    toolsMenu.style.display = isMenuVisible ? 'none' : 'flex';
  });

  // Close tools menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toolsButton.contains(e.target) && !toolsMenu.contains(e.target)) {
      toolsMenu.style.display = 'none';
    }
  });

  // Show popup function
  window.showPopup = (popupId) => {
    document.querySelectorAll('.popup').forEach(popup => {
      popup.style.display = 'none';
    });
    document.getElementById(popupId).style.display = 'flex';
    toolsMenu.style.display = 'none'; // Close menu after selecting an option
  };

  // Hide popup function
  window.hidePopup = (popupId) => {
    document.getElementById(popupId).style.display = 'none';
  };

  // Scroll to top functionality
  window.addEventListener('scroll', () => {
    scrollToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
  });

  scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
