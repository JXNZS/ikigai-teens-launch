import { describe, it, expect } from "vitest";
import { getTranslation } from "../context/LanguageContext";

describe("i18n Translation System", () => {
  it("should return the English version when language is English", () => {
    const key = "navbar.about";
    const val = getTranslation(key, "en");
    expect(val).toBe("About");
  });

  it("should return the Kannada version when language is Kannada and translation exists", () => {
    const key = "home.heroTitle";
    const val = getTranslation(key, "kn");
    expect(val).toBe("ಹದಿಹರೆಯದವರು ಉದ್ದೇಶ, ಬೆಳವಣಿಗೆ ಮತ್ತು ದಿಕ್ಕನ್ನು ಅನ್ವೇಷಿಸಲು ಸಹಾಯ ಮಾಡುವುದು");
  });

  it("should fall back to English when language is Kannada but translation does not exist", () => {
    const key = "navbar.about";
    const val = getTranslation(key, "kn");
    expect(val).toBe("About");
  });

  it("should return the key itself if no translation key is found at all", () => {
    const val = getTranslation("invalid.key.path", "en");
    expect(val).toBe("invalid.key.path");
  });
});
