"use client";

import {
  AccessibilityProvider,
  AccessibilityToolbar,
  type AccessibilityTranslations,
} from "@multicloud-io/react-a11y-toolbar";

type TranslationOverrides = {
  [Key in keyof AccessibilityTranslations]?: string;
};

function defineTranslations<T extends TranslationOverrides>(translations: T) {
  // The package exposes translation values as English string literals instead
  // of strings. Keep key checking locally while working around that type bug.
  return translations as unknown as Partial<AccessibilityTranslations>;
}

const spanishTranslations = defineTranslations({
  title: "Menú de accesibilidad",
  openMenu: "Abrir menú de accesibilidad",
  closeMenu: "Cerrar menú de accesibilidad",
  resetAll: "Restablecer todo",
  close: "Cerrar",
  contentAdjustments: "Ajustes de contenido",
  fontSizeLabel: "Tamaño de fuente",
  increaseFontSize: "Aumentar tamaño de fuente",
  decreaseFontSize: "Disminuir tamaño de fuente",
  readableFont: "Fuente legible",
  highlightTitles: "Resaltar títulos",
  highlightLinks: "Resaltar enlaces",
  colorAdjustments: "Ajustes de color",
  darkContrast: "Contraste oscuro",
  lightContrast: "Contraste claro",
  highContrast: "Contraste alto",
  highSaturation: "Saturación alta",
  lowSaturation: "Saturación baja",
  monochrome: "Monocromático",
  navigationAids: "Ayudas visuales y de navegación",
  readingGuide: "Guía de lectura",
  stopAnimations: "Detener animaciones",
  bigCursor: "Cursor grande",
  hideImages: "Ocultar imágenes",
  textSpacing: "Espaciado de texto",
  letterSpacing: "Espaciado entre letras",
  lineHeight: "Altura de línea",
  fontWeight: "Texto en negritas",
  screenReader: "Lector de pantalla",
  profiles: "Perfiles de accesibilidad",
  seizureSafe: "Perfil seguro para epilepsia",
  seizureSafeDesc: "Detiene las animaciones y reduce la saturación de color.",
  visuallyImpaired: "Perfil para discapacidad visual",
  visuallyImpairedDesc: "Mejora el contraste y la legibilidad para personas con baja visión.",
  adhdFriendly: "Perfil para TDAH",
  adhdFriendlyDesc: "Reduce las distracciones para facilitar la concentración.",
  cognitiveLearning: "Perfil cognitivo y de aprendizaje",
  cognitiveLearningDesc: "Incluye herramientas para facilitar la lectura y la comprensión.",
});

export default function AccessibilityTools({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AccessibilityProvider>
      {children}
      <AccessibilityToolbar
        locale="es-MX"
        langMap={{ en: "en-US", he: "he-IL", "es-MX": "es-MX" }}
        translations={spanishTranslations}
      />
    </AccessibilityProvider>
  );
}
