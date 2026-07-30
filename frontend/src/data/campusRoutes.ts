export const CAMPUS_SHUTTLE_ROUTE: [number, number][] = [
  [23.0742, 76.8502], // Main Gate
  [23.0758, 76.8495], // Boys Hostel
  [23.0768, 76.8505], // Central Library
  [23.0778, 76.8512], // AB-1
  [23.0785, 76.8525], // AB-2
  [23.0792, 76.8488], // Girls Hostel
  [23.0768, 76.8518], // Food Court
  [23.0752, 76.8530], // Sports Complex
  [23.0742, 76.8502], // Back to Main Gate
];

export const MOCK_NAVIGATION_PATHS: Record<string, [number, number][]> = {
  'AB1-LIB': [
    [23.0778, 76.8512],
    [23.0775, 76.8510],
    [23.0772, 76.8505],
  ],
  'AB1-FC': [
    [23.0778, 76.8512],
    [23.0773, 76.8515],
    [23.0768, 76.8518],
  ],
  'BH-AB1': [
    [23.0760, 76.8495],
    [23.0768, 76.8505],
    [23.0778, 76.8512],
  ],
  'DEFAULT': [
    [23.0778, 76.8512],
    [23.0785, 76.8525],
  ],
};
