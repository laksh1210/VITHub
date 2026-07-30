import L from 'leaflet';

export const createCustomIcon = (
  color: string = '#6C63FF',
  symbol: string = '📍',
  size: number = 34
) => {
  const svgHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6), 0 0 10px ${color}80;
      border: 2px solid #ffffff;
      cursor: pointer;
    ">
      <span style="transform: rotate(45deg); font-size: ${size * 0.45}px; font-weight: bold;">
        ${symbol}
      </span>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

export const BUILDING_ICONS = {
  ACADEMIC: createCustomIcon('#6C63FF', '🏫', 36),
  HOSTEL: createCustomIcon('#3B82F6', '🏢', 34),
  LIBRARY: createCustomIcon('#8B5CF6', '📚', 34),
  CANTEEN: createCustomIcon('#F59E0B', '🍔', 34),
  ADMINISTRATIVE: createCustomIcon('#10B981', '🏛️', 34),
  SPORTS: createCustomIcon('#EC4899', '⚽', 34),
  OTHER: createCustomIcon('#6B7280', '📍', 32),
};

export const POI_ICONS = {
  LANDMARK: createCustomIcon('#A78BFA', '🌟', 30),
  PARKING: createCustomIcon('#3B82F6', '🅿️', 30),
  EMERGENCY: createCustomIcon('#EF4444', '🚨', 34),
  SHUTTLE: createCustomIcon('#10B981', '🚌', 36),
};
