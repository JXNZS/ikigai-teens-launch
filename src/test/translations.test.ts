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

  it("should return the translated FAQ title and subtitle", () => {
    expect(getTranslation("faq.title", "en")).toBe("Frequently Asked Questions");
    expect(getTranslation("faq.title", "kn")).toBe("ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು");
    expect(getTranslation("faq.subtitle", "kn")).toBe("ಇಕಿಗೈ ಟೀನ್ ನೈಜ, ಸುರಕ್ಷಿತ, ವಿವೇಕಪೂರ್ಣ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಯುವ ಅಭಿವೃದ್ಧಿ ಉಪಕ್ರಮವಾಗಿದೆ.");
  });

  it("should return translated accordion questions", () => {
    const key = "faq.questions.What makes Ikigai Teen different?";
    expect(getTranslation(key, "en")).toBe("What makes Ikigai Teen different?");
    expect(getTranslation(key, "kn")).toBe("ಇಕಿಗೈ ಟೀನ್ನ ವಿಶೇಷತೆ ಏನು?");
  });

  it("should return translated point descriptions", () => {
    const desc = "Schools build academic knowledge. Ikigai Teen develops self-awareness, decision-making, emotional strength, and character.";
    expect(getTranslation(`faq.strings.${desc}`, "kn")).toBe("ಶಾಲೆಗಳು ಶೈಕ್ಷಣಿಕ ಜ್ಞಾನವನ್ನು ಬೆಳೆಸುತ್ತವೆ. ಇಕಿಗೈ ಟೀನ್ ಆತ್ಮಜಾಗೃತಿ, ವಿವೇಕಪೂರ್ಣ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯ, ಭಾವನಾತ್ಮಕ ಸ್ಥೈರ್ಯ ಹಾಗೂ ಉತ್ತಮ ವ್ಯಕ್ತಿತ್ವವನ್ನು ಬೆಳೆಸಲು ನೆರವಾಗುತ್ತದೆ.");
  });

  it("should return translated Values page elements", () => {
    expect(getTranslation("values.title", "en")).toBe("Vision, Mission & Values");
    expect(getTranslation("values.title", "kn")).toBe("ದೃಷ್ಟಿ, ಧ್ಯೇಯ ಮತ್ತು ಆದರ್ಶಗಳು");
    expect(getTranslation("values.vision", "kn")).toBe("ದೃಷ್ಟಿ – Vision");
    expect(getTranslation("values.mission", "kn")).toBe("ಧ್ಯೇಯ- Mission");
    expect(getTranslation("values.valuesTitle", "kn")).toBe("ಮೌಲ್ಯಗಳು – Values");
    expect(getTranslation("values.strings.Integrity - Doing what is right even when it is difficult or when no one is watching.", "kn")).toBe("ಪ್ರಾಮಾಣಿಕತೆ (Integrity) – ಕಷ್ಟದ ಸಂದರ್ಭದಲ್ಲಿಯೂ ಅಥವಾ ಯಾರೂ ನೋಡದಿದ್ದಾಗಲೂ ಸರಿಯಾದದ್ದನ್ನೇ ಮಾಡುವ ಮನೋಭಾವ.");
  });
});
