import ytdl, { MoreVideoDetails } from '@distube/ytdl-core';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Values {
    url: string,
    downloadURL: string,
}
interface State {
    values: Values
    details: MoreVideoDetails | null,
    formats: ytdl.videoFormat[],
}
interface Actions {
    setDetails: (details: MoreVideoDetails | null) => void,
    setFormats: (formats: ytdl.videoFormat[]) => void,
    setValues: (values: Partial<Values>) => void,
}

export const useDownloadStore = create(
    persist<State & Actions>(
        (set, get) => ({
            values: {
                downloadURL: "",
                url: "https://www.youtube.com/watch?v=P0aPK7wy6_8"
            },
            details: null,
            formats: [],
            setDetails: (details) => set({ details }),
            setFormats: (formats) => set({ formats }),
            setValues: (values) => set({
                values: { ...get().values, ...values }
            })
        }),
        {
            name: 'video-storage',
            // skipHydration: true, // Requires the useStoreHydration usage
            storage: createJSONStorage(() => sessionStorage),
        }
    ))