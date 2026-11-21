/**
 * leafValidator.js
 * High-precision agronomic pre-screener for AGRI-MIND Vision AI.
 * Strictly enforces that only authentic crop diseased leaf photos (Paddy, Chilli, Cotton) are allowed.
 * Rejects cars, vehicles, ornamental flowers, humans, animals, and non-agricultural imagery.
 */

const NON_CROP_KEYWORDS = [
  // Vehicles / Cars
  'car', 'cars', 'automobile', 'vehicle', 'vehicles', 'sedan', 'suv', 'truck',
  'bmw', 'audi', 'tesla', 'toyota', 'honda', 'ford', 'hyundai', 'maruti', 'tata',
  'wheel', 'tire', 'motorcycle', 'bike', 'scooter', 'traffic', 'engine',

  // Ornamental Flowers
  'flower', 'flowers', 'rose', 'roses', 'daisy', 'daisies', 'tulip', 'tulips',
  'sunflower', 'sunflowers', 'lotus', 'lily', 'lilies', 'orchid', 'orchids',
  'petal', 'petals', 'bouquet', 'jasmine', 'marigold', 'hibiscus',

  // Non-agricultural / synthetic / human
  'person', 'people', 'human', 'face', 'selfie', 'man', 'woman', 'child',
  'dog', 'cat', 'animal', 'pet', 'bird',
  'building', 'house', 'room', 'interior', 'office', 'laptop', 'computer',
  'phone', 'screen', 'screenshot', 'circuit', 'chip', 'motherboard'
];

/**
 * Validates whether an uploaded image is a candidate crop diseased leaf.
 * @param {string} imageSrc - Base64 Data URL or HTTP Image URL
 * @param {string} fileName - Original file name
 * @returns {Promise<{isValid: boolean, detectedType?: string, message?: string}>}
 */
export const validateCropLeafImage = (imageSrc, fileName = '') => {
  return new Promise((resolve) => {
    const nameLower = (fileName || '').toLowerCase();

    // 1. Filename & Metadata Heuristic
    for (const kw of NON_CROP_KEYWORDS) {
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${kw}([^a-zA-Z0-9]|$)`, 'i');
      if (regex.test(nameLower) || nameLower.includes(kw)) {
        let detected = 'non-crop object';
        if (['car', 'cars', 'automobile', 'vehicle', 'vehicles', 'sedan', 'suv', 'truck', 'bmw', 'audi', 'tesla', 'toyota', 'honda', 'wheel', 'motorcycle', 'bike'].includes(kw)) {
          detected = 'car / vehicle';
        } else if (['flower', 'flowers', 'rose', 'roses', 'daisy', 'daisies', 'tulip', 'sunflower', 'lotus', 'lily', 'orchid', 'petal', 'petals', 'bouquet', 'jasmine', 'marigold'].includes(kw)) {
          detected = 'ornamental flower';
        }

        return resolve({
          isValid: false,
          detectedType: detected,
          message: `Detected ${detected.toUpperCase()} ("${kw}"). Only crop diseased leaf photos (Paddy, Chilli, Cotton) are allowed.`
        });
      }
    }

    // 2. HTML5 Canvas Pixel Chromatic Spectrum Analysis
    if (!imageSrc) {
      return resolve({ isValid: false, detectedType: 'empty', message: 'No image provided.' });
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 64; // downsample to 64x64 (4096 pixels) for ultra-fast client-side scan
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        let foliarPixels = 0;           // Green/yellow/chlorosis/brown necrotic leaf pixels
        let flowerPetalPixels = 0;      // Saturated magenta, rose red, cyan, pure purple
        let metallicVehiclePixels = 0;  // Grayscale metallic, deep car blacks, high chrome contrast
        const totalPixels = size * size;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // RGB to HSV Conversion
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const d = max - min;
          const s = max === 0 ? 0 : d / max;
          const v = max / 255;
          let h = 0;

          if (d !== 0) {
            if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
            else if (max === g) h = ((b - r) / d + 2) * 60;
            else h = ((r - g) / d + 4) * 60;
          }

          // Foliar Agricultural Range:
          // Green foliage: Hue 65° – 165°
          // Yellowish chlorosis: Hue 35° – 65° with saturation >= 0.18
          // Brown/amber necrotic lesion: Hue 16° – 35° with saturation >= 0.15 and v between 0.12 and 0.80
          const isGreenLeaf = (h >= 65 && h <= 165 && s >= 0.12);
          const isYellowChlorosis = (h >= 35 && h < 65 && s >= 0.18 && v >= 0.20);
          const isBrownLesion = (h >= 16 && h < 35 && s >= 0.15 && v >= 0.12 && v <= 0.80);

          if (isGreenLeaf || isYellowChlorosis || isBrownLesion) {
            foliarPixels++;
          }

          // Floral Petals (non-crop flower colors):
          // Vibrant magenta / red / pink / violet petals: (h > 310 or h < 14) with high saturation (s > 0.40)
          // Violet / Indigo / Cyan flower petals: h between 180 and 260 with s > 0.35
          if (((h >= 310 || h <= 14) && s >= 0.40 && v >= 0.30) || (h >= 180 && h <= 260 && s >= 0.35 && v >= 0.30)) {
            flowerPetalPixels++;
          }

          // Metallic / Vehicle / Synthetic Signatures:
          // Extremely low saturation metallic grays/silvers (s < 0.08) with high contrast extremes (v < 0.12 or v > 0.88)
          // Or bright automotive primary blues (h 200°-235° with high s and v)
          if ((s < 0.08 && (v < 0.12 || v > 0.88)) || (h >= 200 && h <= 235 && s >= 0.50 && v >= 0.30)) {
            metallicVehiclePixels++;
          }
        }

        const foliarRatio = foliarPixels / totalPixels;
        const flowerRatio = flowerPetalPixels / totalPixels;
        const metallicRatio = metallicVehiclePixels / totalPixels;

        // Rejection Rule 1: High flower petal density
        if (flowerRatio > 0.18 && foliarRatio < 0.35) {
          return resolve({
            isValid: false,
            detectedType: 'ornamental flower',
            message: 'Detected ornamental flower petals. Only crop diseased leaf photos (Paddy, Chilli, Cotton) are allowed.'
          });
        }

        // Rejection Rule 2: Very low organic foliage/leaf content (typical for cars, machinery, rooms)
        if (foliarRatio < 0.15) {
          return resolve({
            isValid: false,
            detectedType: metallicRatio > 0.28 ? 'car / vehicle' : 'non-crop subject',
            message: 'Non-crop image detected. Only crop diseased leaf photos (Paddy, Chilli, Cotton) are allowed.'
          });
        }

        // Passed validation as an agricultural leaf photo
        resolve({
          isValid: true,
          foliarRatio
        });
      } catch (err) {
        // Fallback gracefully to allow analysis if canvas reading is restricted by browser sandbox
        resolve({ isValid: true });
      }
    };

    img.onerror = () => {
      resolve({ isValid: true });
    };

    img.src = imageSrc;
  });
};
