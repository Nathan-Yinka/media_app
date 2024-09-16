const colorMap = {
   a: { textColor: "#ff4d4d", backgroundColor: "#ffe6e6" }, // Red
   b: { textColor: "#1a73e8", backgroundColor: "#e6f2ff" }, // Blue
   c: { textColor: "#34a853", backgroundColor: "#e6f4e6" }, // Green
   d: { textColor: "#fbcc06", backgroundColor: "#fff9e6" }, // Yellow
   e: { textColor: "#ea4335", backgroundColor: "#fde8e6" }, // Dark Red
   f: { textColor: "#ff6f00", backgroundColor: "#fff2e0" }, // Orange
   g: { textColor: "#00cc66", backgroundColor: "#e6fff2" }, // Emerald
   h: { textColor: "#ff00ff", backgroundColor: "#ffe6ff" }, // Magenta
   i: { textColor: "#00bcd4", backgroundColor: "#e0f7fa" }, // Cyan
   j: { textColor: "#795548", backgroundColor: "#efebe9" }, // Brown
   k: { textColor: "#009688", backgroundColor: "#e0f2f1" }, // Turquoise
   l: { textColor: "#ff9800", backgroundColor: "#fff3e0" }, // Amber
   m: { textColor: "#9c27b0", backgroundColor: "#f3e5f5" }, // Purple
   n: { textColor: "#3f51b5", backgroundColor: "#e8eaf6" }, // Indigo
   o: { textColor: "#f44336", backgroundColor: "#ffebee" }, // Red
   p: { textColor: "#e91e63", backgroundColor: "#fce4ec" }, // Pink
   q: { textColor: "#673ab7", backgroundColor: "#ede7f6" }, // Deep Purple
   r: { textColor: "#ff6f61", backgroundColor: "#ffe6e6" }, // Coral
   s: { textColor: "#4caf50", backgroundColor: "#e8f5e9" }, // Green
   t: { textColor: "#0d9488", backgroundColor: "#ccfbf1" }, // Teal
   u: { textColor: "#2196f3", backgroundColor: "#e3f2fd" }, // Light Blue
   v: { textColor: "#ff5722", backgroundColor: "#fbe9e7" }, // Deep Orange
   w: { textColor: "#607d8b", backgroundColor: "#eceff1" }, // Blue Gray
   x: { textColor: "#8bc34a", backgroundColor: "#f1f8e9" }, // Light Green
   y: { textColor: "#cddc39", backgroundColor: "#f9fbe7" }, // Lime
   z: { textColor: "#8e44ad", backgroundColor: "#f2e6f2" }, // Purple
};

export const getCategoryColor = (category = "") => {
   if (!category) {
      return { textColor: "#333", backgroundColor: "#eee" };
   }

   const firstLetter = category.charAt(0).toLowerCase();
   return (
      colorMap[firstLetter] || { textColor: "#333", backgroundColor: "#eee" }
   );
};
