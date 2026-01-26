export type Screen = 'start' | 'buttons' | 'subButtons' | 'video';

export interface AppState {
  currentScreen: Screen;
  selectedCategory: number | null;
  selectedVideo: number | null;
}

// Main category buttons
export const MAIN_CATEGORIES = [
  { id: 1, label: 'Our Businesses' },
  { id: 2, label: 'Our Vision' },
  { id: 3, label: 'Our Infrastructure' },
];

// Sub-buttons for each category
export const SUB_BUTTONS: Record<number, { id: number; label: string; videoFile: string }[]> = {
  1: [
    { id: 1, label: 'Aviation', videoFile: 'aviation.mp4' },
    { id: 2, label: 'Consumer Retail', videoFile: 'consumer_retail.mp4' },
    { id: 3, label: 'I&C', videoFile: 'inc.mp4' },
    { id: 4, label: 'LPG', videoFile: 'lpg.mp4' },
    { id: 5, label: 'MAK Lubricants', videoFile: 'mak_lubricants.mp4' },
    { id: 6, label: 'Natural Gas', videoFile: 'natural_gas.mp4' },
    { id: 7, label: 'Retail', videoFile: 'retail.mp4' },
  ],
  2: [
    { id: 1, label: 'Biofuel', videoFile: 'biofuel.mp4' },
    { id: 2, label: 'Exploration', videoFile: 'exploration.mp4' },
    { id: 3, label: 'Petrochemicals', videoFile: 'petrochemicals.mp4' },
    { id: 4, label: 'New Age Mobility', videoFile: 'new_age_mobility.mp4' },
    { id: 5, label: 'Renewables', videoFile: 'renewables.mp4' },
  ],
  3: [
    { id: 1, label: 'Mumbai Refinery', videoFile: 'mumbai_refinery.mp4' },
    { id: 2, label: 'Kochi Refinery', videoFile: 'kochi_refinery.mp4' },
    { id: 3, label: 'Bina Refinery', videoFile: 'bina_refinery.mp4' },
    { id: 4, label: 'Corporate R&D Centre', videoFile: 'corporate_rd.mp4' },
    { id: 5, label: 'Pipelines', videoFile: 'pipelines.mp4' },
    { id: 6, label: 'E&P', videoFile: 'enp.mp4' },
  ],
};
